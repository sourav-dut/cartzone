import express from 'express';
import { authMiddleware, vendorAdminMiddleware } from '../../middleware/auth.middleware.js';
import { createProduct, deleteById, getAll, getById, undeleteById, updateById } from '../controller/product.controller.js';
const router = express.Router();

router
    .post("/create", authMiddleware, vendorAdminMiddleware, createProduct)
    .get("/get-all", authMiddleware, getAll)
    .get("/:id", authMiddleware, getById)
    .patch("/:id", authMiddleware, vendorAdminMiddleware, updateById)
    .patch("/undelete/:id", authMiddleware, vendorAdminMiddleware, undeleteById)
    .delete("/:id", authMiddleware, vendorAdminMiddleware, deleteById)

export default router;