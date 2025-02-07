import { Schema, model } from "mongoose";

const inv_variants_Schema = new Schema({
    variant_name: {
        type: String,
        required: true
    },
    unit: {
        type: String,
        default: null,
    },
    slug: {
        type: String,
        unique: true
    },
    data_type: {
        type: String,
        default: "text",
        enum: ["text", "number"],
    }
});

export const VariantModel = model("Variant", inv_variants_Schema); // Fixed spelling

const inv_variantsOptions_Schema = new Schema({
    variant_id: {
        type: Schema.Types.ObjectId,
        ref: "Variant", // Fixed reference
        required: true      
    },
    value: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        unique: true
    },
});

export const VariantOptionsModel = model("VariantOption", inv_variantsOptions_Schema); // More meaningful model name
