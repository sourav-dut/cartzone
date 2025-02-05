import { Schema, model } from "mongoose";

const inv_categorySchema = new Schema({
    category_name: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        lowercase: true
    }
}, { timestamps: true });

export const CategoryModel = model("Category", inv_categorySchema);