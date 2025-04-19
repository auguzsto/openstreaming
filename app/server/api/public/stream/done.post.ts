import { JwtAdapter } from "~/src/jwt/JwtAdapter";
import { Stream } from "~/src/streams/Stream";
import { StreamPayload } from "~/src/streams/StreamPayload";
import { StreamRepository } from "~/src/streams/StreamRepository";
import { User } from "~/src/users/User";
import { UserRepository } from "~/src/users/UserRepository";

export default defineEventHandler(async (event) => {
    let body: Stream = await readBody(event);
    console.log(body)
    const jwt = JwtAdapter.builder();
    const userRepository = new UserRepository();
    const token = body.key
    const playload = jwt.decode(token) as StreamPayload;

    const user = await userRepository.findById(playload.id) as User;
    if (!user) {
        setResponseStatus(event, 404)
        return { statusCode: 404, message: "Usuário inválido" }
    }

    const streamRepository = new StreamRepository();
    await streamRepository.deleteByNameAndClientIdAndApp(body);
})