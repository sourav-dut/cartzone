import { Schema, model } from "mongoose"

const wishlistSchema = new Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        ref: "User",
        require: true
    },
    product_id: {
        type: Schema.Types.ObjectId,
        ref: "Product",
        require: true
    },
    note: {
        type: String,
    }
}, { timestamps: true, versionKey: false })

export const WishlistModel = model("Wishlist", wishlistSchema)