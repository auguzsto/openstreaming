import type { Stream } from "./Stream";
import { StreamSchema } from "./StreamSchema";

export class StreamRepository {

    async create(data: Stream): Promise<boolean> {
        const stream = new StreamSchema(data);
        await stream.save();
        return true;
    }

    async delete(data: Stream): Promise<boolean> {
        await StreamSchema.deleteMany({ name: data.name, clientid: { $gte: data.clientid }, app: { $gte: data.app } });
        return true;
    }
}