import userModel from '../../model/user.model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'


// Register User
const registrationController = async (req, res) => {
    try {
        const { name, email, password, phone } = req.body;
        console.log(req.body);
        

        // validation check
        if (!name || !email || !password) {
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

        const newUser = await userModel.create({
            name,
            email,
            password: hashedPassword,
            phone,
        });

        // generate token
        const token = jwt.sign({ user: newUser }, process.env.JWT_SECRET, {
            expiresIn: "7d"
        });

        return res.status(201).send({
            success: true,
            message: "User created successfully",
            newUser,
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
        const token = jwt.sign({ user: user }, process.env.JWT_SECRET, {
            expiresIn: "7d"
        });

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


export {
    registrationController,
    loginController
}