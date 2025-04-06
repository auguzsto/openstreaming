import { Document, Schema } from "mongoose";
import { UserSchema } from "../users/UserSchema";
import { User } from "../users/User";

export class AuthRepository {

    async findByUsername(username: String): Promise<boolean | User> {
        const user = await UserSchema.findOne({ username: `${username}` }) as User;
        if (!user) {
            return false;
        }
        
        return user;
    }
}