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

const inv_varientsOptions_Schema = new Schema({
    vatient_id: {
        type: Schema.Types.ObjectId,
        ref: "Varient"
    },
    options_name: {
        type: String
    },
    slug: {
        type: String
    },
});

export const VarientOptionsModel = model("Varient", inv_varientsOptions_Schema);