import { exec } from "child_process";
import { JwtAdapter } from "~/src/jwt/JwtAdapter";
import { Stream } from "~/src/streams/Stream";
import { StreamRepository } from "~/src/streams/StreamRepository";

export default defineEventHandler(async (event) => {
    const body: Stream = await readBody(event);
    const jwt = JwtAdapter.builder();
    
    if (!jwt.verify(body.key)) {
        setResponseStatus(event, 403)
        return;
    }

    const streamRepository = new StreamRepository();
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

