import { Schema, model } from "mongoose";

const inv_varients_Schema = new Schema({
    varient_name: {
        type: String
    },
    unit: {
        type: String,
        default: null,
    },
    slug: {
        type: String
    },
    data_type: {
        type: String,
        default: "text",
        enum: ["text", "number"],
    }
});

export const VarientModel = model("Varient", inv_varients_Schema);