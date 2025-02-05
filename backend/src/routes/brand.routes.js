import express from 'express';
import { adminMiddleware, authMiddleware } from "../../middleware/auth.middleware.js";
import { createBrand, deleteBrand, getBrand, updateBrand } from "../controller/brand.controller.js";
const router = express.Router();

router
    .post("/create", authMiddleware, adminMiddleware, createBrand)
    .get("/get", getBrand)
    .patch("update/:id", authMiddleware, adminMiddleware, updateBrand)
    .delete("/delete/:id", authMiddleware, adminMiddleware, deleteBrand)

export default router;