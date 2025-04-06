import { Stream } from "~/server/streams/Stream";
import { StreamRepository } from "~/server/streams/StreamRepository";
import { User } from "~/server/users/User";
import { UserRepository } from "~/server/users/UserRepository";

export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const keyStream = body.name as string;
    const username = keyStream.split("_")[0];
    const key = keyStream.split("_")[1];

    if (key == undefined || key == "") {
        setResponseStatus(event, 403)
        return;
    }
    
    const streamRepository = new StreamRepository();
    let stream = await streamRepository.findByKey(key) as Stream;
    if (!stream) {
        setResponseStatus(event, 403)
        return {
            statusCode: 403,
            message: "Chave de tranmissão inválida."
        }
    }
    
    const userRepository = new UserRepository();
    const user = await userRepository.findById(stream.userId) as User;
    if (user.username != username) {
        setResponseStatus(event, 403);
        return {
            statusCode: 403,
            message: "Chave de transmissão inválida."
        }
    }

    sendRedirect(event, `rtmp://127.0.0.1:1935/live-published/${user.username}`, 302);
});