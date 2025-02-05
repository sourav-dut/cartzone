import { Schema, model } from "mongoose"

const brandSchema = new Schema({
    brand_name: {
        type: String,
        required: true
    }
})

export const BrandModel = model("Brand", brandSchema);