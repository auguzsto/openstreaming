import { JwtAdapter } from "~/src/jwt/JwtAdapter";
import { Stream } from "~/src/streams/Stream";
import { StreamPayload } from "~/src/streams/StreamPayload";
import { StreamRepository } from "~/src/streams/StreamRepository";
import { User } from "~/src/users/User";
import { UserRepository } from "~/src/users/UserRepository";

export default defineEventHandler(async (event) => {
    const body: Stream = await readBody(event);
    const jwt = JwtAdapter.builder();
    const token = body.name;
    const secret = `${process.env.JWT_SECRET}`;
    const isTokenValid = jwt.verify(token, secret);
    
    if (!isTokenValid) {
        setResponseStatus(event, 403)
        return;
    }

    const playload = jwt.decode(token) as StreamPayload;
    const userRepository = new UserRepository();
    const user = await userRepository.findById(playload.id) as User;
    if (!user) {
        setResponseStatus(event, 404);
        return { statusCode: 404, message: "Usuário inválido" }
    }

    const streamRepository = new StreamRepository();
    body.name = user.username;
    await streamRepository.create(body)
});