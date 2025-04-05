import { Stream } from "~/server/streams/Stream";
import { StreamRepository } from "~/server/streams/StreamRepository";
import { User } from "~/server/users/User";
import { UserRepository } from "~/server/users/UserRepository";

export default defineEventHandler(async (event) => {
    const streamRepository = new StreamRepository();
    const userRepository = new UserRepository();
    
    const body = await readBody(event);
    const keyStream = body.name as string;
    const username = keyStream.split("_")[0];
    const key = keyStream.split("_")[1];

    if (key == undefined || key == "") {
        setResponseStatus(event, 403)
        return;
    }

    let result = await streamRepository.findByKey(key) as Stream;
    if (!result) {
        setResponseStatus(event, 403)
        return {
            statusCode: 403,
            message: "Chave de tranmissão inválida."
        }
    }

    const user = await userRepository.findById(result.userId) as User;
    sendRedirect(event, `rtmp://127.0.0.1:1935/live-published/${user.username}`, 302);
});