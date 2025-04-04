import { Document } from "mongoose";
import { UserSchema } from "./UserSchema";

export class UserRepository {

    async create(data: Object): Promise<Number | Error> {
        try {
            const user = new UserSchema(data);
            await user.save();
            return user.id;
        } catch (error) {
            throw error;
        }
    }

    async findByUsername(username: string): Promise<Object | boolean> {
        try {
            const query = UserSchema.where({ username: `${username}` });
            const result = await query.findOne();
            return result!.toObject();
        } catch (error) {
            throw error;
        }
    }
}