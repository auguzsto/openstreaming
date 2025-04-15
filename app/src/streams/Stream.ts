import type { ObjectId } from "mongoose";

export interface Stream {
    id?: ObjectId,
    call: String,
    clientid: string,
    addr: string,
    app: string,
    name: string
}