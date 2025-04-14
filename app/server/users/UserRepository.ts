import { UserSchema } from "./UserSchema";
import { User } from "./User";
import { Types } from "mongoose";

export class UserRepository {

    async create(data: Object): Promise<string | boolean> {
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
            if (!Types.ObjectId.isValid(userid)) {
                return false;
            }
            
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

    async findByEmail(email: string): Promise<User | boolean> {
        try {
            const result = await UserSchema.findOne({ email: `${email}` });
            if (!result) {
                return false;
            }

            return result as User;
        } catch (error) {
            throw error;
        }
    }

    async changeLiveOn(user: User, status: boolean): Promise<boolean> {
        try {
            let userSchema = await UserSchema.findById(user!.id);
            userSchema!.liveOn = status;
            await userSchema!.save();
            return true;
        } catch (error) {
            throw error;
        }
    }
}