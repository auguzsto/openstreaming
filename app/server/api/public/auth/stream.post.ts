import { JwtAdapter } from "~/src/jwt/JwtAdapter";
import { Stream } from "~/src/streams/Stream";
import { StreamPayload } from "~/src/streams/StreamPayload";
import { User } from "~/src/users/User";
import { UserRepository } from "~/src/users/UserRepository";

export default defineEventHandler(async (event) => {
    const body: Stream = await readBody(event);
    const token = body.name;

    if (token == undefined || token == "") {
        setResponseStatus(event, 403)
        return;
    }

    const jwt = JwtAdapter.builder();
    const verify = jwt.verify(token);
    if (!verify) {
        setResponseStatus(event, 403)
        return {
            statusCode: 403,
            message: "Chave de transmissão inválida"
        }
    }

    const payload = jwt.decode(token) as StreamPayload;
    const userRepository = new UserRepository();
    const user = await userRepository.findById(payload.id) as User;
    
    sendRedirect(event, `rtmp://127.0.0.1:1935/live-published/${user.username}?key=${token}`, 302);
});