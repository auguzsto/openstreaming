import { JwtAdapter } from "~/src/jwt/JwtAdapter";
import { Stream } from "~/src/streams/Stream";
import { StreamPayload } from "~/src/streams/StreamPayload";
import { StreamRepository } from "~/src/streams/StreamRepository";
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
    const secret = `${process.env.JWT_SECRET}`
    const verify = jwt.verify(token, secret);
    if (!verify) {
        setResponseStatus(event, 403)
        return {
            statusCode: 403,
            message: "Chave de transmissão inválida"
        }
    }

    
    sendRedirect(event, `rtmp://127.0.0.1:1935/live-published/${token}`, 302);
});