import { StreamRepository } from "~/src/streams/StreamRepository";

export default defineEventHandler(async (event) => {
    const name = getRouterParam(event, "name") as string;
    const streamRepository = new StreamRepository();
    const result = await streamRepository.findByName(name)
    if (!result) {
        setResponseStatus(event, 404)
        return;
    }

    setResponseStatus(event, 200)
    return {
        statusCode: 200,
        message: "Transmissão encontrada"
    }
})