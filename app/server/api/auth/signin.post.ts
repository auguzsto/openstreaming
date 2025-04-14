import { AuthRepository } from "~/server/auth/AuthRepository";
import { AuthSignInRequest } from "~/server/auth/AuthSignInRequest";
import { User } from "~/server/users/User";
import bcrypt from "bcrypt";
import { JwtJsonWebToken } from "~/server/jwt/JwtJsonWebToken";
import { JwtAdapter } from "~/server/jwt/JwtAdapter";

export default defineEventHandler(async (event) => {
    try {
        const authRepository = new AuthRepository();
        const body = await readBody(event) as AuthSignInRequest;
        let user = await authRepository.findByUsername(body.username) as User;

        if (!user) {
            setResponseStatus(event, 400)
            return {
                statusCode: 400,
                message: "Autenticação inválida", 
            }
        }
        
        const matched = await isMatchPassword(body, user);
        if (!matched) {
            setResponseStatus(event, 400)
            return {
                statusCode: 400,
                message: "Autenticação inválida."
            }
        }

        const jwt = JwtAdapter.builder();
        const secret = process.env.JWT_SECRET as string;
        const token = jwt.sign({ id: user.id }, secret, 3600);

        return {
            token: token,
        }
    } catch (error) {
        throw error;
    }
})

async function isMatchPassword(authSignInRequest: AuthSignInRequest, user: User): Promise<boolean> {
    let password = authSignInRequest.password as string;
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
        return false;
    }

    return true;
}