import { JwtAdapter } from "~/server/jwt/JwtAdapter";
import { JwtJsonWebToken } from "~/server/jwt/JwtJsonWebToken";
import { User } from "~/server/users/User";
import { UserRepository } from "~/server/users/UserRepository";

export default defineEventHandler(async (event) => {
    const userRepository = new UserRepository();
    const userid = getRouterParam(event, "userid") as string;
    const user = await userRepository.findById(userid) as User;
    if (!user) {
        setResponseStatus(event, 404);
        return {
            statusCode: 404,
            message: "Usuário inválido."
        }
    }

    const streamToken = createStreamToken(userid);
    return {
        key: `${streamToken}`
    }
});

function createStreamToken(userid: string): string {
    const jwt = JwtAdapter.builder();
    const secret = process.env.JWT_SECRET as string;
    const expiresIn = 300; //in seconds.
    return jwt.sign({ id: userid }, secret, expiresIn);
}