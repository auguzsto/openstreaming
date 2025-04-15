import type { ObjectId } from "mongoose";

export interface User {
    id?: ObjectId,
    username: string,
    password: string,
    email: string,
    liveOn: boolean,
    createAt: Date,
}