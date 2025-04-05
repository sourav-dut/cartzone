import { Schema, model } from "mongoose"

const cartSchema = new Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    product_id: {
        type: Schema.Types.ObjectId,
        ref: "Product",
        required: true
    },
    quantity: {
        type: Number,
        default: 1,
    },
    discountPrice: {
        type: Number
    }
}, { versionKey: false })

export const CartModel = model("Cart", cartSchema);