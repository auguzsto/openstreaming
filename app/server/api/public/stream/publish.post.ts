import { exec } from "child_process";
import { JwtAdapter } from "~/src/jwt/JwtAdapter";
import { Stream } from "~/src/streams/Stream";
import { StreamPayload } from "~/src/streams/StreamPayload";
import { StreamRepository } from "~/src/streams/StreamRepository";
import { UserRepository } from "~/src/users/UserRepository";

export default defineEventHandler(async (event) => {
    const body: Stream = await readBody(event);
    const jwt = JwtAdapter.builder();
    const userRepository = new UserRepository()
    const streamRepository = new StreamRepository();
    
    if (!jwt.verify(body.key)) {
        setResponseStatus(event, 403)
        return;
    }

    const payload = jwt.decode(body.key) as StreamPayload
    const user = await userRepository.findById(payload.id);
    if (!user) {
        setResponseStatus(event, 403)
        return;
    }

    let isInLive = await streamRepository.findByName(body.name);
    if (isInLive) {
        await streamRepository.deleteByNameAndApp(body)
    }

    await publishWithPreview(body, streamRepository)
});

async function publishWithPreview(body: Stream, repository: StreamRepository): Promise<void> {
    setTimeout(async () => {
        exec(`ffmpeg -i http://proxy/live/hls/${body.name}/index.m3u8 -vframes 1 -q:v 2 /uploads/${body.name}_preview.jpg`);
        await repository.create(body);
    }, 10000)
    return;
}

