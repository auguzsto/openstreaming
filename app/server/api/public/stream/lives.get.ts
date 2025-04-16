import { StreamLivesResponse } from "~/src/streams/StreamLivesResponse";
import { StreamRepository } from "~/src/streams/StreamRepository";

export default defineEventHandler(async (event) => {
    const streamRepository = new StreamRepository();
    const result = await streamRepository.findAll();
    return result.map(response => new StreamLivesResponse(response))
});