import { User } from "~/src/users/User";
import { UserRepository } from "~/src/users/UserRepository"

export default defineEventHandler(async (event) => {
    const userRepository = new UserRepository();
    const user = await userRepository.findById(event.context.auth.id) as User;
    return user;
})