import { Document, Schema } from "mongoose";
import { UserSchema } from "../users/UserSchema";

export class AuthRepository {

    async findByUsername(username: String): Promise<boolean | Document> {
        const query = UserSchema.where({ username: `${username}` });
        const result = await query.findOne();
        
        if (result?.$isEmpty) {
            return false;
        }

        const user = new UserSchema();
        return user;
    }
}