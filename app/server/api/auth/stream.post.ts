import { JwtJsonWebToken } from "~/server/jwt/JwtJsonWebToken";
import { Stream } from "~/server/streams/Stream";
import { StreamPayload } from "~/server/streams/StreamPayload";
import { User } from "~/server/users/User";
import { UserRepository } from "~/server/users/UserRepository";

export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const token = body.name as string;

    if (token == undefined || token == "") {
        setResponseStatus(event, 403)
        return;
    }
    
    const jwt = new JwtJsonWebToken();
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