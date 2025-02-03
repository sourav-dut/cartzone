import userModel from '../../model/user.model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'
import { sanitizeUser } from '../utils/sanitizeUser.js';
import { generateToken } from '../utils/generateToken.js';
import { otpModel } from '../../model/otp.model.js';
import { generateOTP } from '../utils/generateOtp.js';
import { sendMail } from '../utils/Emails.js';


// Register User
const registrationController = async (req, res) => {
    try {
        const { username, email, password, phone } = req.body;
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
        });

        // getting secure user info
        const secureInfo=sanitizeUser(newUser);

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

// Login User
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
        console.log("token", token);
        

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

// Send OTP
const sendOtp = async (req, res) => {
    try {
        const existingUser = await userModel.findById(req.body._id)

        if (!existingUser) {
            return res.status(404).json({ "message": "User not found" })
        }

        await otpModel.deleteMany({ user_id: existingUser._id })

        const otp = generateOTP();
        const hashedOtp = await bcrypt.hash(otp, 10);

        const newOtp = new otpModel({ user_id: req.body._id, otp: hashedOtp, expiresAt: Date.now() + parseInt(process.env.OTP_EXPIRATION_TIME) })
        await newOtp.save()

        await sendMail(existingUser.email, `OTP Verification for Your MERN-AUTH-REDUX-TOOLKIT Account`, `Your One-Time Password (OTP) for account verification is: <b>${otp}</b>.</br>Do not share this OTP with anyone for security reasons`)

        res.status(201).json({ 'message': "OTP sent" })

    } catch (error) {
        res.status(500).json({ 'message': "Some error occured while resending otp, please try again later" })
        console.log(error);
    }
}

export {
    registrationController,
    loginController,
    sendOtp
}