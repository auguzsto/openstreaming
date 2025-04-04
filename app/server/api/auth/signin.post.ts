import { AuthRepository } from "~/server/auth/AuthRepository";
import { AuthSignInRequest } from "~/server/auth/AuthSignInRequest";

export default defineEventHandler(async (event) => {
    try {
        const authRepository = new AuthRepository();
        const body = await readBody(event) as AuthSignInRequest;

        if (await authRepository.findByUsername(body.username)) {
            setResponseStatus(event, 400)
            return {
                statusCode: 400,
                message: "Usuário inválido", 
            }
        }
        
        return {
            token: "bWF1Z3VzdG8="
        }
    } catch (error) {
        throw error;
    }

})