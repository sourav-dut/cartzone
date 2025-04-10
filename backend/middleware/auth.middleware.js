import jwt, { decode } from 'jsonwebtoken'
import userModel from '../model/user.model.js';


// const authMiddleware = async (req, res, next) => {
//     try {
//         // get token from user
//         const token = req.headers["authorization"].split(" ")[1];
//         // console.log(token);
        
//         if (!token) {
//             return res.status(404).send({
//                 success: false,
//                 message: "Please provide token"
//             })
//         };

//         jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
//             if (err) {
//                 return res.status(404).send({
//                     success: false,
//                     message: "Unauthorized user"
//                 })
//             }
//             req.body.user = decode.user;
//             next();
//         })
        
//     } catch (error) {
//         console.log(error);
//         return res.status(500).send({
//             success: false,
//             message: "Error in authMiddleware"
//         })
//     }
// };

const authMiddleware = async (req, res, next) => {
    try {
        const authHeader = req.headers["authorization"];
        
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).send({
                success: false,
                message: "Authorization header missing or malformed",
            });
        }

        const token = authHeader.split(" ")[1];

        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                return res.status(401).send({
                    success: false,
                    message: "Invalid or expired token",
                });
            }

            req.user = decoded.user; // attach decoded user to request
            next();
        });

    } catch (error) {
        console.error("Auth Middleware Error:", error);
        return res.status(500).send({
            success: false,
            message: "Internal server error in auth middleware",
        });
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