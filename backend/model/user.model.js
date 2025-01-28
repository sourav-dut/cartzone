import mongoose, { Schema, model } from "mongoose";

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'user name is required']
    },
    email: {
        type: String,
        required: [true, 'email is required'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'password is required'],
        unique: true
    },
    phone: {
        type: Number,
        required: [true, "phone number is required"]
    },
    userRole: {
        type: String,
        default: "customer",
        enum: ["admin", "customer", "vendor"],
    },
    profilePhoto: {
        type: String,
        default: "https://cdn-icons-png.flaticon.com/512/149/149071.png"
    },
    parent: {
        type: String
    }
}, {timestamps: true})

const userModel = model('users', userSchema);

export default userModel;