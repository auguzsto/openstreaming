import type { Stream } from "./Stream";
import { StreamSchema } from "./StreamSchema";

export class StreamRepository {

    async create(data: Stream): Promise<boolean> {
        const stream = new StreamSchema(data);
        await stream.save();
        return true;
    }

    async deleteByNameAndClientIdAndApp(data: Stream): Promise<boolean> {
        await StreamSchema.deleteMany({ name: data.name, clientid: { $gte: data.clientid }, app: { $gte: data.app } });
        return true;
    }

    async findAll(): Promise<Array<Stream>> {
        const result = await StreamSchema.find() as Array<Stream>;
        return result;
    }

    async findByName(name: string): Promise<Stream | boolean> {
        const result = await StreamSchema.findOne({ name: `${name}` }) as Stream;
        if (!result) {
            return false;
        }

        return result;
    }
}