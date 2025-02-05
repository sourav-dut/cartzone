import { BrandModel } from "../../model/brand.model.js";

// Create Category
export const createBrand = async (req, res) => {
    try {
        const {brand_name} = req.body;
        if (!brand_name) return res.status(404).send({msg: "Please enter the brand name"});

        const brand = await new BrandModel({brand_name}).save();

        return res.status(201).json({
            success: true,
            brand
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "Error occured while create a new Brand, please try again later"
        })
    }
};

// Get Brand
export const getBrand = async (req, res) => {
    try {
        const brands = await BrandModel.find({});
        if (!brands) return res.status(404).json({msg: "Sorry! no brands found"});

        return res.status(201).json({
            success: true,
            brands
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "Error occured while get Brand, please try again later"
        })
    }
};

// Update Brand
export const updateBrand = async (req, res) => {
    try {
        const {new_brand_name} = req.body;
        const updatedBrand = await BrandModel.findByIdAndUpdate(req.params.id, { brand_name: new_brand_name});

        return res.status(201).json({
            success: true,
            updatedBrand
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "Error occured while update the Brand, please try again later"
        })
    }
};

// Delete Brand
export const deleteBrand = async (req, res) => {
    try {
        await BrandModel.findByIdAndDelete(req.params.id);

        return res.status(201).json({
            success: true,
            masg: "Brand Deleted Successfully"
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "Error occured while delete a new Brand, please try again later"
        })
    }
};