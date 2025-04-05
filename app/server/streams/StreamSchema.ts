import { model, Schema } from "mongoose";

const schema = new Schema({
    userId: {
        type: String, 
        unique: true,
    },

    key: {
        type: String,
        unique: true,
    }
})

export const StreamSchema = model("Stream", schema);