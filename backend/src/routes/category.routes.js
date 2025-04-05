import express from 'express'
import { authMiddleware, adminMiddleware } from '../../middleware/auth.middleware.js';
import { createCategory, deleteCategory, getCategory } from '../controller/Category.controller.js';
// import { invCreateCategory, createSubCategory, createSubSubCategory, invDeleteCategory, deleteSubCategory, deleteSubSubCategory, invGetCategory, getSubCategory, getSubSubCategory, invUpdateCategory } from '../controller/InvCategory.controller.js';
const router = express.Router();

router
    .post("/create", createCategory)
    .get("/get", getCategory)
    .delete("/delete/:id", deleteCategory)


// //////////////// Category ///////////////////////////
// router
//     .post("/create", authMiddleware, adminMiddleware, invCreateCategory)
//     .get("/get", invGetCategory)
//     .patch("update/:id", authMiddleware, adminMiddleware, invUpdateCategory)
//     .delete("/delete/:id", authMiddleware, adminMiddleware, invDeleteCategory)

// //////////////// Sub_Category ///////////////////////////
// router
//     .post("/sub-category/create", authMiddleware, adminMiddleware, createSubCategory)
//     .get("/sub-category/get", getSubCategory)
//     .delete("/sub-category/delete/:id", authMiddleware, adminMiddleware, deleteSubCategory)

// //////////////// Sub_Sub_Category ///////////////////////////
// router
//     .post("/child-category/create", authMiddleware, adminMiddleware, createSubSubCategory)
//     .get("/child-category/get", getSubSubCategory)
//     .delete("/child-category/delete/:id", authMiddleware, adminMiddleware, deleteSubSubCategory)

export default router;