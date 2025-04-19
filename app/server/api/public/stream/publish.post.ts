import { JwtAdapter } from "~/src/jwt/JwtAdapter";
import { Stream } from "~/src/streams/Stream";
import { StreamPayload } from "~/src/streams/StreamPayload";
import { StreamRepository } from "~/src/streams/StreamRepository";
import { User } from "~/src/users/User";
import { UserRepository } from "~/src/users/UserRepository";

export default defineEventHandler(async (event) => {
    const body: Stream = await readBody(event);
    const jwt = JwtAdapter.builder();
    const secret = `${process.env.JWT_SECRET}`;
    const isTokenValid = jwt.verify(body.key, secret);
    
    if (!isTokenValid) {
        setResponseStatus(event, 403)
        return;
    }

    const streamRepository = new StreamRepository();
    await streamRepository.create(body);
});