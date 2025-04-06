import mongoose, { model, Schema } from "mongoose";

const schema = new Schema({
    username: {
        type: String,
        require: true,
        unique: true,
    },

    password: {
        type: String,
        require: true,
    },

    email: {
        type: String,
        require: true,
        unique: true,
    },

    liveOn: {
        type: Boolean,
        default: false,
    },

    createAt: {
        type: Date,
        default: Date.now()
    }
})

export const UserSchema = model("User", schema);