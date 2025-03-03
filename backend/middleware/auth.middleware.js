import jwt, { decode } from 'jsonwebtoken'
import userModel from '../model/user.model.js';

const authMiddleware = async (req, res, next) => {
    try {
        // get token from user
        const token = req.headers["authorization"].split(" ")[1];
        // console.log(token);
        
        if (!token) {
            return res.status(404).send({
                success: false,
                message: "Please provide token"
            })
        };

        jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
            if (err) {
                return res.status(404).send({
                    success: false,
                    message: "Unauthorized user"
                })
            }
            req.body.user = decode.user;
            next();
        })
        
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "Error in authMiddleware"
        })
    }
};

// Admin Middleware
const adminMiddleware = async (req, res, next) => {
    try {
        const user = await userModel.findById(req.body.user._id);

        if (!user) {
            return res.status(404).send({
                success: false,
                message: "admin Unauthorized"
            })
        };

        if (user.userRole != "admin") {
            return res.status(404).send({
                success: false,
                message: "Only admin can access"
            })
        } else {
            next();
        }

    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "Error in check admin middleware"
        })
    }
}

// Vendor-Admin Middleware
const vendorAdminMiddleware = async (req, res, next) => {
    try {
        const user = await userModel.findById(req.body.user._id);

        if (!user) {
            return res.status(404).send({
                success: false,
                message: "admin Unauthorized"
            })
        };

        if (user.userRole === "admin" || "vendor") {
            next();
        } else {
            return res.status(404).send({
                success: false,
                message: "Only admin or vendor can access"
            })
        }

    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "Error in check admin middleware"
        })
    }
}

export {
    authMiddleware,
    adminMiddleware,
    vendorAdminMiddleware
}