import { Schema, model } from "mongoose"

const otpSchema=new Schema({
    user_id:{
        type: Schema.Types.ObjectId,
        ref:"users",
        required:true
    },
    otp:{
        type:String,
        required:true
    },
    expiresAt:{
        type:Date,
        required:true
    },
})

export const otpModel = model("Otp", otpSchema);