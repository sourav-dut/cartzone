import { Schema, model } from "mongoose";

const inv_sub_categorySchema = new Schema({
    sub_category_name: {
        type: String,
        required: true
    },
    category_id: {
        type: Schema.Types.ObjectId,
        ref: "Category"
    },
    slug: {
        type: String,
        lowercase: true
    }
}, { timestamps: true });

export const SubCategoryModel = model("SubCategory", inv_sub_categorySchema);