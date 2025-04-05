import { CategoryModel } from "../../model/inv_category.model.js";
import slugify from 'slugify';
import { SubCategoryModel } from "../../model/inv_sub_Category.model.js";
import { SubSubCategoryModel } from "../../model/inv_sub_sub_Category.model.js";

//////////////// Category ///////////////////////////
// Create Category
export const invCreateCategory = async (req, res) => {
    try {
        const {category_name} = req.body;
        if (!category_name) return res.status(404).send({msg: "Please enter the category name"});

        const category = await new CategoryModel({category_name, slug: slugify(category_name)}).save();

        return res.status(201).json({
            success: true,
            category
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "Error occured while create a new Category, please try again later"
        })
    }
};

// Get Category
export const invGetCategory = async (req, res) => {
    try {
        const categories = await CategoryModel.find({});
        if (!categories) return res.status(404).json({msg: "Sorry! no categories found"});

        return res.status(201).json({
            categories
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "Error occured while get Category, please try again later"
        })
    }
};

// Update Category
export const invUpdateCategory = async (req, res) => {
    try {
        const {new_category_name} = req.body;
        const updatedCategory = await CategoryModel.findByIdAndUpdate(req.params.id, { category_name: new_category_name});

        return res.status(201).json({
            success: true,
            updatedCategory
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "Error occured while update the Category, please try again later"
        })
    }
};

// Delete Category
export const invDeleteCategory = async (req, res) => {
    try {
        await CategoryModel.findByIdAndDelete(req.params.id);

        return res.status(201).json({
            success: true,
            masg: "Category Deleted Successfully"
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "Error occured while delete a new Category, please try again later"
        })
    }
};


//////////////// Sub-Category ///////////////////////////

// Create Category
export const createSubCategory = async (req, res) => {
    try {
        const {sub_category_name, category_id} = req.body;
        if (!sub_category_name) return res.status(404).send({msg: "Please enter the sub_category name"});

        const sub_category = await new SubCategoryModel({sub_category_name, category_id, slug: slugify(sub_category_name)}).save();

        return res.status(201).json({
            success: true,
            sub_category
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "Error occured while create a new SubCategory, please try again later"
        })
    }
};

// Get SubCategory
export const getSubCategory = async (req, res) => {
    try {
        const sub_categories = await SubCategoryModel.find({});
        if (!sub_categories) return res.status(404).json({msg: "Sorry! no categories found"});

        return res.status(201).json({
            success: true,
            sub_categories
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "Error occured while get SubCategory, please try again later"
        })
    }
};

// Delete SubCategory
export const deleteSubCategory = async (req, res) => {
    try {
        await SubCategoryModel.findByIdAndDelete(req.params.id);

        return res.status(201).json({
            success: true,
            masg: "Category Deleted Successfully"
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "Error occured while delete a new SubCategory, please try again later"
        })
    }
};


//////////////// Sub-Sub-Category ///////////////////////////

// Create SubSubCategory
export const createSubSubCategory = async (req, res) => {
    try {
        const {sub_sub_category_name, sub_category_id} = req.body;
        if (!sub_sub_category_name) return res.status(404).send({msg: "Please enter the sub_sub_category name"});

        const sub_sub_category = await new SubSubCategoryModel({sub_sub_category_name, sub_category_id, slug: slugify(sub_sub_category_name)}).save();

        return res.status(201).json({
            success: true,
            sub_sub_category
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "Error occured while create a new SubSubCategory, please try again later"
        })
    }
};

// Get SubSubCategory
export const getSubSubCategory = async (req, res) => {
    try {
        const categories = await SubSubCategoryModel.find({});
        if (!categories) return res.status(404).json({msg: "Sorry! no categories found"});

        return res.status(201).json({
            success: true,
            categories
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "Error occured while get SubSubCategory, please try again later"
        })
    }
};

// Delete SubSubCategory
export const deleteSubSubCategory = async (req, res) => {
    try {
        await SubSubCategoryModel.findByIdAndDelete(req.params.id);

        return res.status(201).json({
            success: true,
            masg: "Category Deleted Successfully"
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "Error occured while delete a new SubSubCategory, please try again later"
        })
    }
};
