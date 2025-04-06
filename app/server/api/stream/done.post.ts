import { User } from "~/server/users/User";
import { UserRepository } from "~/server/users/UserRepository";

export default defineEventHandler(async (event) => {
    let body = await readBody(event);
    const userRepository = new UserRepository();
    let user = await userRepository.findByUsername(body.name) as User;
    await userRepository.changeLiveOn(user, false);
})