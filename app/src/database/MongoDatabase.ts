import mongoose, { connect } from "mongoose";
import type { DatabaseInterface } from "./DatabaseInterface";

export class MongoDatabase implements DatabaseInterface {
    async init(): Promise<void> {
        try {
            await mongoose.connect(`${process.env.DATABASE_TYPE}://${process.env.DATABASE_USER}:${process.env.DATABASE_PASSWORD}@${process.env.DATABASE_HOST}:${process.env.DATABASE_PORT}/${process.env.DATABASE_NAME}?authSource=admin`);
            console.log("Conexão com mongodb realizada");
        } catch (error) {
            throw error;
        }
    }
   
}