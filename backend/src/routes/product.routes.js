import express from 'express';
import { authMiddleware, vendorAdminMiddleware } from '../../middleware/auth.middleware.js';
import { createProduct, deleteProductById, getAllProduct, getProductById, searchSuggestions, undeleteProductById, updateProductById } from '../controller/product.controller.js';
import { productModel } from '../../model/inv_product.model.js';
const router = express.Router();

router
    .post("/create", authMiddleware, vendorAdminMiddleware, createProduct)
    .get("/get-all", getAllProduct)
    .get("/:id", getProductById)
    .patch("/:id", authMiddleware, vendorAdminMiddleware, updateProductById)
    .patch("/undelete/:id", authMiddleware, vendorAdminMiddleware, undeleteProductById)
    .delete("/delete/:id", authMiddleware, vendorAdminMiddleware, deleteProductById)
    .get('/search', searchSuggestions);

export default router;  