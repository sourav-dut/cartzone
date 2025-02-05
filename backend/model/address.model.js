import { Schema, model } from "mongoose";

const addressSchema = new Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    street: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    state: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: Number,
        required: true,
    },
    pinCode: {
        type: String,
        required: true,
    },
    country: {
        type: String,
        required: true,
    },
    // type: {
    //     type: String,
    //     required: true,
    // },
}, { timestamps: true })

const addressModel = model('Address', addressSchema);

export default addressModel;