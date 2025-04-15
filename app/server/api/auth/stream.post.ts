import { JwtAdapter } from "~/src/jwt/JwtAdapter";
import { JwtJsonWebToken } from "~/src/jwt/JwtJsonWebToken";
import { Stream } from "~/src/streams/Stream";
import { StreamPayload } from "~/src/streams/StreamPayload";
import { User } from "~/src/users/User";
import { UserRepository } from "~/src/users/UserRepository";

export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const token = body.name as string;

    if (token == undefined || token == "") {
        setResponseStatus(event, 403)
        return;
    }
    
    const jwt = JwtAdapter.builder();
    const secret = process.env.JWT_SECRET as string;
    const verify = jwt.verify(token, secret);
    if (!verify) {
        setResponseStatus(event, 403)
        return {
            statusCode: 403,
            message: "Chave de transmissão inválida"
        }
    }
    
    const payload = jwt.decode(token, secret) as StreamPayload;
    const userRepository = new UserRepository();
    const user = await userRepository.findById(payload.id) as User;
    await userRepository.changeLiveOn(user, true);
    sendRedirect(event, `rtmp://127.0.0.1:1935/live-published/${user.username}`, 302);
});