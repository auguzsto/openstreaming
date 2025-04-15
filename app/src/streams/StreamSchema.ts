import { model, Schema } from "mongoose";

const schema = new Schema({
    call: {
        type: String,
    },

    clientid: {
        type: String,
    },

    addr: {
        type: String,
        unique: true,
    },

    app: {
        type: String,
    },

    name: {
        type: String,
    }
});

export const StreamSchema = model("Stream", schema);