import express from 'express'
import { loginController, registrationController, sendOtp } from '../controller/auth.controller.js';
import { deleteUserByIdController, getAllUsersController, getUserByIdController, updateUserByIdController } from '../controller/user.controller.js';
import { authMiddleware } from '../../middleware/auth.middleware.js';
const router = express.Router();

//////////////// User Authentication ///////////////////////////
router
    .post("/register", registrationController)
    .post("/login", loginController)
    .post("/resend-otp", sendOtp)


//////////////// User Operation ///////////////////////////
router.get("/get-all", authMiddleware, getAllUsersController);
router.get("/get-user", authMiddleware, getUserByIdController);
router.delete("/delete-user", authMiddleware, deleteUserByIdController);
router.put("/update-user", authMiddleware, updateUserByIdController);


//////////////// User Address ///////////////////////////
// router.post("/create-address", authMiddleware, )

export default router;