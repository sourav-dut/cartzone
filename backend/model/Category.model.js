import mongoose, { Schema, model } from "mongoose";

const categorySchema = new Schema({
    name: {
        type: String,
        quired: true,
    },
    parent_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        default: null
    },
    slug: {
        type: String,
        lowercase: true 
    }
});

export const Category = model("Category", categorySchema);