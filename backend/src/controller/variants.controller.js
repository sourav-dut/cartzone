import slugify from "slugify";
import { VariantModel, VariantOptionsModel } from "../../model/inv_varients.model.js";

///////////////////////////// VARIANTS /////////////////////////////
// Create Varients
export const createVariant = async (req, res) => {
    try {
        const { variant_name, unit, data_type } = req.body;

        // Check if variant already exists
        const existingVariant = await VariantModel.findOne({ variant_name });
        if (existingVariant) {
            return res.status(400).json({ message: "Variant with this variant_name already exists" });
        }

        // Create a new variant
        const newVariant = new VariantModel({ variant_name, slug: slugify(variant_name), unit, data_type });
        await newVariant.save();

        return res.status(201).json({ message: "Variant created successfully", variant: newVariant });
    } catch (error) {
        return res.status(500).json({ message: "Server error", error: error.message });
    }
};

// Get Variants
export const getAllVariants = async (req, res) => {
    try {
        const variants = await VariantModel.find();
        return res.status(200).json({ variants });
    } catch (error) {
        return res.status(500).json({ message: "Server error", error: error.message });
    }
};

// Delete Variant
export const deleteVariant = async (req, res) => {
    try {
        // Delete the variant
        const deletedVariant = await VariantModel.findByIdAndDelete(req.params.id);
        if (!deletedVariant) {
            return res.status(404).json({ message: "Variant not found" });
        }

        return res.status(200).json({ message: "Variant deleted successfully" });
    } catch (error) {
        return res.status(500).json({ message: "Server error", error: error.message });
    }
};



///////////////////////////// VARIANTS OPTIONS /////////////////////////////

// Create VarientsOptions
export const createVariantOption = async (req, res) => {
    try {
        const { variant_id, value } = req.body;

        // Check if variant already exists
        const existingVariantOption = await VariantOptionsModel.findOne({ value });
        if (existingVariantOption) {
            return res.status(400).json({ message: "Variant with this slug already exists" });
        }

        // Create a new variant
        const newVariantOption = new VariantOptionsModel({ variant_id, value, slug: slugify(value) });
        await newVariantOption.save();

        return res.status(201).json({ message: "Variant created successfully", variant: newVariantOption });
    } catch (error) {
        return res.status(500).json({ message: "Server error", error: error.message });
    }
};

// Get Variants
export const getAllVariantOptions = async (req, res) => {
    try {
        const variantsOptions = await VariantOptionsModel.find().populate("variant_id");
        return res.status(200).json({ variantsOptions });
    } catch (error) {
        return res.status(500).json({ message: "Server error", error: error.message });
    }
};

// Delete Variant
export const deleteVariantOption = async (req, res) => {
    try {
        // Delete the variant
        const deletedVariantOption = await VariantOptionsModel.findByIdAndDelete(req.params.id);
        if (!deletedVariantOption) {
            return res.status(404).json({ message: "VariantOptions not found" });
        }

        return res.status(200).json({ message: "Variant deleted successfully" });
    } catch (error) {
        return res.status(500).json({ message: "Server error", error: error.message });
    }
};