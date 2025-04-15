import type { ObjectId } from "mongoose";

export interface Stream {
    id?: ObjectId,
    userId: string;
    key: string;
}