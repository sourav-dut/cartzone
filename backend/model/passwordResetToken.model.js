import { Schema, model } from "mongoose"

const passwordResetTokenSchema = new Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    token: {
        type: String,
        required: true
    },
    expiresAt: {
        type: Date,
        required: true
    },
})



export const PasswordResetTokenModel = model("PasswordResetToken", passwordResetTokenSchema);