import mongoose from "mongoose";
import { productModel } from "../../model/inv_product.model.js";
import { generateSKU } from "../utils/generateSKU.js";
import slugify from "slugify";

// create product 
export const createProduct = async (req, res) => {
    try {
        const { title,
            description,
            price,
            discountPercentage,
            // variant_option_id,
            sub_sub_category_id,
            brand_id,
            stockQuantity,
            thumbnail,
            images,
            isDeleted } = req.body;

            console.log("products",req.body);

        if (!title || !description || !price || !sub_sub_category_id || !brand_id || !stockQuantity) {
            return res.status(404).send({
                success: false,
                msg: "All fildes are required"
            })
        };

        const product = new productModel({
            title,
            description,
            price,
            discountPercentage,
            user_id: req.body.user._id,
            // variant_option_id,
            sub_sub_category_id,
            brand_id,
            sku: generateSKU(title, String(price), sub_sub_category_id),
            stockQuantity,
            thumbnail,
            images,
            slug: slugify(title),
            isDeleted
        });
        await product.save();

        return res.status(201).send({ success: true, product });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Error adding product, please trying again later' })
    }
};

// Get All Products
export const getAllProduct = async (req, res) => {
    // http://localhost:5000/api/products?brand=Nike&category=Shoes&sort=price&order=asc&page=1&limit=10
    try {
        const filter = {};  // Object to store filter conditions for MongoDB query
        const sort = {};    // Object to define sorting order
        let skip = 0;       // Number of documents to skip (for pagination)
        let limit = 0;      // Number of documents to fetch (for pagination)

        // get barnd_id through query parameter
        if (req.query.brand && mongoose.Types.ObjectId.isValid(req.query.brand)) {
            filter.brand_id = new mongoose.Types.ObjectId(req.query.brand);
        } else if (req.query.brand) {
            console.log("Invalid brand ID:", req.query.brand);
        }

        // get sub_sub_category_id through query parameter
        if (req.query.category && mongoose.Types.ObjectId.isValid(req.query.category)) {
            filter.sub_sub_category_id = new mongoose.Types.ObjectId(req.query.category);
        } else if (req.query.category) {
            console.log("Invalid category ID:", req.query.category);
        }

        if (req.query.user) {
            filter['isDeleted'] = false
        }

        if (req.query.sort) {
            sort[req.query.sort] = req.query.order ? (req.query.order === 'asc' ? 1 : -1) : 1;
            /* What Does asc Mean ?
                asc stands for ascending order.
                In sorting:
                Ascending(asc) → Smallest to Largest / A → Z
                Descending(desc) → Largest to Smallest / Z → A */
        }

        console.log("Filter", filter);

        if (req.query.page && req.query.limit) {
            const pageSize = req.query.limit;
            const page = req.query.page;

            skip = pageSize * (page - 1); // Skip documents from previous pages
            limit = pageSize;  // Limit the number of documents per request
        }

        const totalDocs = await productModel.find(filter).sort(sort).populate("brand_id").populate("sub_sub_category_id").countDocuments().exec();
        /*productModel.find(filter): Finds products matching the filter.
        .countDocuments(): Counts the total number of matching products.
        .exec(): Executes the query.*/

        const results = await productModel.find(filter).sort(sort).populate("brand_id").populate("sub_sub_category_id").skip(skip).limit(limit).exec();
        /*filter → Filter conditions (e.g., brand, category).
        sort → Sorting order (e.g., price ascending).
        skip(skip) → Skips items for pagination.
        limit(limit) → Limits the number of results per page.
        .populate("brand"): Fetches brand details.*/

        //  Setting the Response Header
        res.set("X-Total_Count", totalDocs);

        return res.status(200).json(results);

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Error adding product, please trying again later' })
    }
};

// Get Product by Id
export const getProductById = async (req, res) => {
    try {
        const { id } = req.params
        const result = await productModel.findById(id).populate("brand_id").populate("sub_sub_category_id");
        res.status(200).json(result)
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error getting product details, please try again later' })
    }
};

// Update Product by Id
export const updateProductById = async (req, res) => {
    try {
        const { id } = req.params
        const updated = await productModel.findByIdAndUpdate(id, req.body, { new: true })
        res.status(200).json(updated)
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error updating product, please try again later' })
    }
}

// Un-delete by Id
export const undeleteProductById = async (req, res) => {
    try {
        const { id } = req.params
        const unDeleted = await productModel.findByIdAndUpdate(id, { isDeleted: false }, { new: true }).populate('brand')
        res.status(200).json(unDeleted)
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error restoring product, please try again later' })
    }
};

// Delete by Id
export const deleteProductById = async (req, res) => {
    try {
        const { id } = req.params
        const deleted = await productModel.findByIdAndDelete(id, { isDeleted: true }, { new: true }).populate("brand_id")
        res.status(200).json(deleted)   
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error deleting product, please try again later' })
    }
}