import express from 'express';
import { authMiddleware, vendorAdminMiddleware } from '../../middleware/auth.middleware.js';
import { createProduct, deleteProductById, getAllProduct, getProductById, undeleteProductById, updateProductById } from '../controller/product.controller.js';
const router = express.Router();

router
    .post("/create", authMiddleware, vendorAdminMiddleware, createProduct)
    .get("/get-all", authMiddleware, getAllProduct)
    .get("/:id", authMiddleware, getProductById)
    .patch("/:id", authMiddleware, vendorAdminMiddleware, updateProductById)
    .patch("/undelete/:id", authMiddleware, vendorAdminMiddleware, undeleteProductById)
    .delete("/:id", authMiddleware, vendorAdminMiddleware, deleteProductById)

export default router;