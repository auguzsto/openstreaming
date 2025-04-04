import { UserRepository } from "~/server/users/UserRepository";

export default defineEventHandler(async (event) => {
    try {
        const username = getRouterParam(event, "username") as string;
        const userRepository = new UserRepository();
        let result = userRepository.findByUsername(username);
        return result;
    } catch (error) {
        throw error;
    }
})