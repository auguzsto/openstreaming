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