import express from 'express'
import { adminMiddleware, authMiddleware } from '../../middleware/auth.middleware.js';
import { createOrder, deleteOrder, getAllOrder, getOrderByUserId, updateOrderById } from '../controller/Order.controller.js';
const router = express.Router();

router
    .post("/create", authMiddleware, createOrder)
    .get("/user/:id", authMiddleware, getOrderByUserId)
    .get("/", authMiddleware, adminMiddleware, getAllOrder)
    .patch("/update", authMiddleware, adminMiddleware, updateOrderById)
    .delete("/delete/:id", authMiddleware, deleteOrder)

export default router;