import mongoose, { connect } from "mongoose";
import { Repository } from "./Repository";

export class MongoRepository implements Repository {
    async init(): Promise<void> {
        try {
            await mongoose.connect(`${process.env.DATABASE_TYPE}://${process.env.DATABASE_USER}:${process.env.DATABASE_PASSWORD}@${process.env.DATABASE_HOST}:${process.env.DATABASE_PORT}/${process.env.DATABASE_NAME}?authSource=admin`);
            console.log("Conexão com mongodb realizada");
        } catch (error) {
            throw error;
        }
    }
   
}