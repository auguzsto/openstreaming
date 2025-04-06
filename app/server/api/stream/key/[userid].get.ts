import { StreamRepository } from "~/server/streams/StreamRepository";
import { User } from "~/server/users/User";
import { UserRepository } from "~/server/users/UserRepository";

export default defineEventHandler(async (event) => {
    const userRepository = new UserRepository();
    const userid = getRouterParam(event, "userid") as string;
    const user = await userRepository.findById(userid) as User;
    if (!user) {
        setResponseStatus(event, 404);
        return {
            statusCode: 404,
            message: "Usuário inválido."
        }
    }

    const streamKey = await createStreamKey(userid);
    return {
        key: `${user.username}_${streamKey}`
    }
});

async function createStreamKey(userid: string): Promise<string> {
    const streamRepository = new StreamRepository();
    const streamKey = Buffer.from(`${Date.now()}`).toString("base64");

    await streamRepository.create({userId: userid, key: streamKey});
    return streamKey;
}