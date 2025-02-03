import express from 'express'
import { frogotPassword, loginController, registrationController, resetPassword, sendOtp, verifyOtp } from '../controller/auth.controller.js';
import { deleteUserByIdController, getAllUsersController, getUserByIdController, updateUserByIdController } from '../controller/user.controller.js';
import { authMiddleware } from '../../middleware/auth.middleware.js';
const router = express.Router();

//////////////// User Authentication ///////////////////////////
router
    .post("/register", registrationController)
    .post("/login", loginController)
    .post("/verify-otp", verifyOtp)
    .post("/resend-otp", sendOtp)
    .post("/forgot-password",frogotPassword)
    .post("/reset-password",resetPassword)


//////////////// User Operation ///////////////////////////
router.get("/get-all", authMiddleware, getAllUsersController);
router.get("/get-user", authMiddleware, getUserByIdController);
router.delete("/delete-user", authMiddleware, deleteUserByIdController);
router.put("/update-user", authMiddleware, updateUserByIdController);


//////////////// User Address ///////////////////////////
// router.post("/create-address", authMiddleware, )

export default router;