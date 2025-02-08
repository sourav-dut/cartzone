import express from 'express'
import { authMiddleware } from '../../middleware/auth.middleware.js';
import { createWishlist, deleteWishlistById, getWishlistByUserId, updateWishlistById } from '../controller/Wishlist.controller.js';
const router = express.Router();

router
    .post("/create", authMiddleware, createWishlist)
    .get("/user/:id", authMiddleware, getWishlistByUserId)
    .patch("/:id", authMiddleware, updateWishlistById)
    .delete("/:id", authMiddleware, deleteWishlistById)


export default router;