import express from 'express';
import { authMiddleware, vendorAdminMiddleware } from '../../middleware/auth.middleware.js';
import { createProduct, deleteProductById, getAllProduct, getProductById, undeleteProductById, updateProductById } from '../controller/product.controller.js';
import { productModel } from '../../model/inv_product.model.js';
const router = express.Router();

router
    .post("/create", authMiddleware, vendorAdminMiddleware, createProduct)
    .get("/get-all", getAllProduct)
    .get("/:id", authMiddleware, getProductById)
    .patch("/:id", authMiddleware, vendorAdminMiddleware, updateProductById)
    .patch("/undelete/:id", authMiddleware, vendorAdminMiddleware, undeleteProductById)
    .delete("/delete/:id", authMiddleware, vendorAdminMiddleware, deleteProductById);

router.get('/search', async (req, res) => {
    try {
        const { keyword } = req.query;

        // MongoDB search query using regex for case-insensitive search
        const products = await productModel.find({
            name: { $regex: keyword, $options: 'i' }  // 'i' makes it case insensitive
        });

        res.json(products);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
});

export default router;  