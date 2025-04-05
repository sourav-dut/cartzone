import { Schema, model } from "mongoose";

const productSchema = new Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
    },
    price:{
        type:Number,
        required:true
    },
    discountPercentage: {
        type: Number,
        default: 0,
    },
    user_id: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    // variant_option_id: {
    //     type: Schema.Types.ObjectId,
    //     ref: "VariantOption",
    //     default: null
    // },
    category_id:{
        type:Schema.Types.ObjectId,
        ref:"Category",
        required:true
    },
    brand_id:{
        type:Schema.Types.ObjectId,
        ref:"Brand",
        required:true
    },
    sku: {
        type: String
    },
    stockQuantity:{
        type:Number,
        required:true,
        default: 0
    },
    thumbnail:{
        type:String,
    },
    images:{
        type:[String],
        required:true
    },
    slug: {
        type: String
    },
    isDeleted:{
        type:Boolean,
        default:false
    }
},{ timestamps: true } );

export const productModel = model("Product", productSchema);