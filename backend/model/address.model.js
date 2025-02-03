import mongoose, { Schema, model } from "mongoose";

const addressSchema = new Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    city: {
        type: String
    },
    state: {
        type: String
    },
    pinCode: { type: Number}
}, {timestamps: true})

const addressModel = model('addresses', addressSchema);

export default addressModel;