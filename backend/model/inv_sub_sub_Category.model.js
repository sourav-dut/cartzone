import { Schema, model } from "mongoose";

const inv_sub_sub_categorySchema = new Schema({
    sub_sub_category_name: {
        type: String,
        required: true
    },
    sub_category_id: {
        type: Schema.Types.ObjectId,
        ref: "SubCategory"
    },
    slug: {
        type: String,
        lowercase: true
    }
}, { timestamps: true });

export const SubSubCategoryModel = model("SubSubCategory", inv_sub_sub_categorySchema);