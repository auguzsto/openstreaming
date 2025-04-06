import { AuthSignUpRequest } from "~/server/auth/AuthSiginUpRequest";
import { UserRepository } from "~/server/users/UserRepository";

export default defineEventHandler(async (event) => {
    try {
        const userRepository = new UserRepository();
        const body = await readBody(event) as AuthSignUpRequest;
        
        if (body.username == "" || body.username == undefined) {
            setResponseStatus(event, 400)
            return { statusCode: 400, message: "Usuário obrigatório"}
        }

        if (body.password == "" || body.password == undefined) {
            setResponseStatus(event, 400)
            return { statusCode: 400, message: "Senha obrigatória"}
        }

        if (body.email == "" || body.email == undefined) {
            setResponseStatus(event, 400)
            return { statusCode: 400, message: "Email obrigatório"}
        }
        
        let id = await userRepository.create(body);
        return {
            id: id,
        }
    } catch (error) {
        throw error;
    }
})