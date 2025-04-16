import { SignInRequest } from "~/src/auth/SignInRequest";
import { User } from "~/src/users/User";
import bcrypt from "bcrypt";
import { JwtAdapter } from "~/src/jwt/JwtAdapter";
import { UserRepository } from "~/src/users/UserRepository";

export default defineEventHandler(async (event) => {
    try {
        const userRepository = new UserRepository();
        const body: SignInRequest = await readBody(event);
        let user = await userRepository.findByUsername(body.username) as User;

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

async function isMatchPassword(bodyRequest: SignInRequest, user: User): Promise<boolean> {
    const match = await bcrypt.compare(bodyRequest.password, user.password);
    if (!match) {
        return false;
    }

    return true;
}