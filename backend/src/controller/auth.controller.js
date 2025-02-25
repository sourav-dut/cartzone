import userModel from '../../model/user.model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'
import { sanitizeUser } from '../utils/sanitizeUser.js';
import { generateToken } from '../utils/generateToken.js';
import { otpModel } from '../../model/otp.model.js';
import { generateOTP } from '../utils/generateOtp.js';
import { sendMail } from '../utils/Emails.js';
import { PasswordResetTokenModel } from '../../model/passwordResetToken.model.js';

//////////////// User Registration ///////////////////////////
const registrationController = async (req, res) => {
    try {
        const { username, email, password, phone, userRole } = req.body;
        console.log(req.body);


        // validation check
        if (!username || !email || !password) {
            return res.status(404).send({
                success: false,
                message: "All fildes are required"
            })
        };

        // check user
        const exisitingUser = await userModel.findOne({ email });
        if (exisitingUser) {
            return res.status(404).send({
                success: false,
                message: "User already exist please Login"
            })
        };

        // Hashing Password
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // create user
        const newUser = await userModel.create({
            username,
            email,
            password: hashedPassword,
            phone,
            userRole
        });

        // getting secure user info
        const secureInfo = sanitizeUser(newUser);

        // generate token
        const token = generateToken(secureInfo);

        return res.status(201).send({
            success: true,
            message: "User created successfully",
            secureInfo,
            token: token
        })

    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "Error in Register API"
        })
    }
};

//////////////// User Login ///////////////////////////
const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;

        // validation check
        if (!email || !password) {
            return res.status(404).send({
                success: false,
                message: "All fildes are required"
            })
        };

        // check user
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).send({
                success: false,
                message: "User not found plese create an account"
            })
        };

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(500).send({
                success: false,
                message: "password incorrect"
            })
        }

        // generate token
        const token = generateToken(user);


        return res.status(201).send({
            success: true,
            message: "Login successfully",
            token: token,
            user
        })

    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "Error in Register API"
        })
    }
}

//////////////// OTP Verification ///////////////////////////
const verifyOtp = async (req, res) => {
    try {
        const { userId, otp } = req.body;
        // checks if user id is existing in the user collection
        const isValidUserId = await userModel.findById(userId)

        // if user id does not exists then returns a 404 response
        if (!isValidUserId) {
            return res.status(404).json({ message: 'User not Found, for which the otp has been generated' })
        }

        // checks if otp exists by that user id
        const isOtpExisting = await otpModel.findOne({ user_id: isValidUserId._id })

        // if otp does not exists then returns a 404 response
        if (!isOtpExisting) {
            return res.status(404).json({ message: 'Otp not found' })
        }

        // checks if the otp is expired, if yes then deletes the otp and returns response accordinly
        if (isOtpExisting.expiresAt < new Date()) {
            await otpModel.findByIdAndDelete(isOtpExisting._id)
            return res.status(400).json({ message: "Otp has been expired" })
        }

        // checks if otp is there and matches the hash value then updates the user verified status to true and returns the updated user
        if (isOtpExisting && (await bcrypt.compare(otp, isOtpExisting.otp))) {
            await otpModel.findByIdAndDelete(isOtpExisting._id)
            const verifiedUser = await userModel.findByIdAndUpdate(isValidUserId._id, { isVerified: true }, { new: true })
            return res.status(200).json(sanitizeUser(verifiedUser))
        }

        // in default case if none of the conidtion matches, then return this response
        return res.status(400).json({ message: 'Otp is invalid or expired' })


    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Some Error occured" })
    }
}


//////////////// Resend OTP ///////////////////////////
const sendOtp = async (req, res) => {
    try {
        const existingUser = await userModel.findById(req.body.userId)

        if (!existingUser) {
            return res.status(404).json({ "message": "User not found" })
        }

        await otpModel.deleteMany({ user_id: existingUser._id })

        const otp = generateOTP();
        const hashedOtp = await bcrypt.hash(otp, 10);

        const newOtp = new otpModel({ user_id: req.body.userId, otp: hashedOtp, expiresAt: Date.now() + parseInt(process.env.OTP_EXPIRATION_TIME) * 1000 })
        await newOtp.save()

        await sendMail(existingUser.email, `OTP Verification for Your MERN-AUTH-REDUX-TOOLKIT Account`, `Your One-Time Password (OTP) for account verification is: <b>${otp}</b>.</br>Do not share this OTP with anyone for security reasons`)

        res.status(201).json({ 'message': "OTP sent" })

    } catch (error) {
        res.status(500).json({ 'message': "Some error occured while resending otp, please try again later" })
        console.log(error);
    }
};


//////////////// Forgot Password - [forgot password token generate] ///////////////////////////
const frogotPassword = async (req, res) => {
    // let newToken;
    try {
        // check if user provided email is exist or not
        console.log(req.body.email);
        
        const isExistingUser = await userModel.findOne({ email: req.body.email });

        // if email does not exists returns a 404 response
        if (!isExistingUser) {
            return res.status(404).json({ message: "Provided email does not exists" })
        }

        await PasswordResetTokenModel.deleteMany({ user_id: isExistingUser._id });

        // if user exist, generates a password reset token
        const resetToken = generateToken(sanitizeUser(isExistingUser), true)
        console.log(resetToken);


        // hashed the token
        const hashedToken = await bcrypt.hash(resetToken, 10);

        // save hashed token in passwordResetToken collection
        const newToken = new PasswordResetTokenModel({ 
            user_id: isExistingUser._id, 
            token: hashedToken, 
            expiresAt: Date.now() + parseInt(process.env.OTP_EXPIRATION_TIME) * 1000 
        });

        await newToken.save();
        console.log(newToken);

        // Generate reset Link
        const resetLink = `http://localhost:${process.env.FRONTEND_URL}/reset-password/${isExistingUser._id}/${resetToken}`;

        // sends the password reset link to the user's mail
        await sendMail(
            isExistingUser.email,
            'Password Reset Link for Your MERN-AUTH-REDUX-TOOLKIT Account',
            `<p>Dear ${isExistingUser.username},</p>
            <p>We received a request to reset the password for your MERN-AUTH-REDUX-TOOLKIT account. If you initiated this request, please use the following link to reset your password:</p>
            <p><a href="${resetLink}" target="_blank">Reset Password</a></p>
            <p>This link is valid for a limited time. If you did not request a password reset, please ignore this email.</p>
            <p>Thank you,<br>The MERN-AUTH-REDUX-TOOLKIT Team</p>`
        );

        res.status(200).json({ message: `Password Reset link sent to ${isExistingUser.email}`, token: hashedToken, _id: isExistingUser._id })

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error occured while sending password reset mail' })
    }
};


//////////////// Reset Password ///////////////////////////
const resetPassword = async (req, res) => {
    try {
        // Check if the user exists
        const isExistingUser = await userModel.findById(req.body.userId);
        if (!isExistingUser) {
            return res.status(404).json({ message: "User does not exist" });
        }

        // Fetch the reset password token by userId
        const isResetTokenExisting = await PasswordResetTokenModel.findOne({ user_id: isExistingUser._id });
        if (!isResetTokenExisting) {
            return res.status(400).json({ message: "Invalid or expired reset link" });
        }

        // Check if the token has expired
        if (isResetTokenExisting.expiresAt < new Date()) {
            await PasswordResetTokenModel.findByIdAndDelete(isResetTokenExisting._id);
            return res.status(400).json({ message: "Reset link has expired" });
        }

        // Compare the provided token with the hashed token in DB
        const isTokenValid = await bcrypt.compare(req.body.token, isResetTokenExisting.token);
        if (!isTokenValid) {
            return res.status(400).json({ message: "Invalid reset token" });
        }

        // Reset the user's password
        isExistingUser.password = await bcrypt.hash(req.body.new_password, 10);
        await isExistingUser.save();

        // Delete the token after successful password reset
        await PasswordResetTokenModel.findByIdAndDelete(isResetTokenExisting._id);

        return res.status(200).json({ message: "Password updated successfully" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "An error occurred while resetting the password. Please try again later." });
    }
};


export {
    registrationController,
    loginController,
    verifyOtp,
    sendOtp,
    frogotPassword,
    resetPassword
}