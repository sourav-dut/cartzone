import slugify from 'slugify';
import { Category } from '../../model/Category.model.js';

//////////////// Category ///////////////////////////
// Create Category
export const createCategory = async (req, res) => {
    try {
        const { name, parent_id } = req.body;
        if (!name) return res.status(404).send({ msg: "Please enter the category name" });

        const category = await new Category({ name, parent_id: parent_id || null, slug: slugify(name) }).save();

        return res.status(201).json({
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
export const getCategory = async (req, res) => {
    try {
        const categories = await Category.find({}).populate({
            path: "parent_id",
            select: "name",
            populate: { path: "parent_id", select: "name" }
        });
        if (!categories) return res.status(404).json({ msg: "Sorry! no categories found" });

        return res.status(201).json({
            categories
        });
        
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "Error occured while get Category, please try again later"
        })
    }
};

// Update Category
export const updateCategory = async (req, res) => {
    try {
        const { new_category_name } = req.body;
        const updatedCategory = await CategoryModel.findByIdAndUpdate(req.params.id, { category_name: new_category_name });

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
export const deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;

        // Check if the category has children
        const subcategories = await Category.find({ parent_id: id });
        if (subcategories.length > 0) {
            return res.status(400).json({ message: "Delete subcategories first" });
        }

        await Category.findByIdAndDelete(id);
        res.json({ message: "Category deleted" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
