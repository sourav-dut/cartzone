import express from 'express'
import { authMiddleware, adminMiddleware } from '../../middleware/auth.middleware.js';
import { createCategory, createSubCategory, createSubSubCategory, deleteCategory, deleteSubCategory, deleteSubSubCategory, getCategory, getSubCategory, getSubSubCategory, updateCategory } from '../controller/Category.controller.js';
const router = express.Router();

//////////////// Category ///////////////////////////
router
    .post("/create", authMiddleware, adminMiddleware, createCategory)
    .get("/get", getCategory)
    .patch("update/:id", authMiddleware, adminMiddleware, updateCategory)
    .delete("/delete/:id", authMiddleware, adminMiddleware, deleteCategory)

//////////////// Sub_Category ///////////////////////////
router
    .post("/sub-category/create", authMiddleware, adminMiddleware, createSubCategory)
    .get("/sub-category/get", getSubCategory)
    .delete("/sub-category/delete/:id", authMiddleware, adminMiddleware, deleteSubCategory)

//////////////// Sub_Sub_Category ///////////////////////////
router
    .post("/child-category/create", authMiddleware, adminMiddleware, createSubSubCategory)
    .get("/child-category/get", getSubSubCategory)
    .delete("/child-category/delete/:id", authMiddleware, adminMiddleware, deleteSubSubCategory)

export default router;