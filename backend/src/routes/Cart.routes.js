import express from 'express';
import { authMiddleware } from '../../middleware/auth.middleware.js';
import { createCart, deleteCartById, deleteCartByUserId, getCartByUserId, updateCartById } from '../controller/Cart.controller.js';
const router = express.Router();

router
    .post("/create", authMiddleware, createCart)
    .get("/user/:id", authMiddleware, getCartByUserId)
    .patch("/cart/:id", authMiddleware, updateCartById)
    .delete("/cart/:id", authMiddleware, deleteCartById)
    .delete("/user/:id", authMiddleware, deleteCartByUserId)

export default router;