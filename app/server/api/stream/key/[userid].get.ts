import { StreamRepository } from "~/server/streams/StreamRepository";
import { UserRepository } from "~/server/users/UserRepository";

export default defineEventHandler(async (event) => {
    const userid = getRouterParam(event, "userid") as string;
    const streamKey = await createStreamKey(userid);
    return {
        key: streamKey
    }
});

async function createStreamKey(userid: string): Promise<string> {
    const streamRepository = new StreamRepository()
    const streamKey = Buffer.from(`${Date.now()}`).toString("base64");
    await streamRepository.create({userId: userid, key: streamKey});
    return streamKey;
}