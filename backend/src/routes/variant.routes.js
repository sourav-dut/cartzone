import express from 'express'
import { adminMiddleware, authMiddleware } from '../../middleware/auth.middleware.js';
import { createVariant, createVariantOption, deleteVariant, deleteVariantOption, getAllVariantOptions, getAllVariants } from '../controller/variants.controller.js';
const router = express.Router();

///////////////////////// Varaents //////////////////////////
router
    .post("/create", authMiddleware, adminMiddleware, createVariant)
    .get("/get", authMiddleware, adminMiddleware, getAllVariants)
    .delete("/delete/:id", authMiddleware, adminMiddleware, deleteVariant)

///////////////////////// Variants Options //////////////////////////
router
    .post("/variant-option/create", authMiddleware, adminMiddleware, createVariantOption)
    .get("/variant-option/get", authMiddleware, adminMiddleware, getAllVariantOptions)
    .delete("/variant-option/delete/:id", authMiddleware, adminMiddleware, deleteVariantOption)

export default router;