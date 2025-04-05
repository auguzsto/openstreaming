import { Stream } from "./Stream";
import { StreamSchema } from "./StreamSchema";

export class StreamRepository {

    async findByKey(key: string): Promise<Stream | boolean> {
        try {
            const result = await StreamSchema.findOne({ key: `${key}` });
            if (!result) {
                return false;
            }

            return result as Stream;
        } catch (error) {
            throw error;
        }
    }

    async create(data: Object): Promise<boolean> {
        try {
            const stream = new StreamSchema(data)
            await stream.save()
            return true;
        } catch (error) {
            throw error;
        }
    }
}