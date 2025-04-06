import { Document } from "mongoose";
import { UserSchema } from "./UserSchema";
import { ObjectLiteralElementLike } from "typescript";
import { User } from "./User";

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

    async findById(userid: string): Promise<User | boolean> {
        try {
            const result = await UserSchema.findById(userid) as User;
            if (!result) {
                return false;
            }

            return result as User;
        } catch (error) {
            throw error;
        }
    }

    async findByUsername(username: string): Promise<User | boolean> {
        try {
            const result = await UserSchema.findOne({ username: `${username}` });
            if (!result) {
                return false;
            }

            return result as User;
        } catch (error) {
            throw error;
        }
    }
}