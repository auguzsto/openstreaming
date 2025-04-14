import { AuthSignUpRequest } from "~/server/auth/AuthSiginUpRequest";
import { UserRepository } from "~/server/users/UserRepository";
import bcrypt from "bcrypt";

export default defineEventHandler(async (event) => {
    try {
        const userRepository = new UserRepository();
        const body: AuthSignUpRequest = await readBody(event);
        
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

        if (await isUsernameExists(body.username)) {
            setResponseStatus(event, 400)
            return { statusCode: 400, message: "Usuário já existe"}
        }

        if (await isEmailExists(body.email)) {
            setResponseStatus(event, 400)
            return { statusCode: 400, message: "E-mail já existe"}
        }
        
        body.password = await hashPassword(body.password as string);
        let id = await userRepository.create(body);
        return {
            id: id,
        }
    } catch (error) {
        throw error;
    }
})

async function hashPassword(password: string): Promise<string> {
    const hash = await bcrypt.hash(password, 10);
    return hash;
}

async function isUsernameExists(username: string): Promise<boolean> {
    const userRepository = new UserRepository();
    const result = await userRepository.findByUsername(username);
    if (!result) {
        return false;
    }

    return true;
}

async function isEmailExists(email: string): Promise<boolean> {
    const userRepository = new UserRepository();
    const result = await userRepository.findByEmail(email);
    if (!result) {
        return false;
    }

    return true;
}