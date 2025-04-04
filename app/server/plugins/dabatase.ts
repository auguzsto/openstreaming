import { MongoRepository } from "../MongoRepository";
import { Repository } from "../Repository";

export default defineNitroPlugin(async (nitroApp) => {
    const repository = new MongoRepository();
    await initDatabase(repository);
});

async function initDatabase(repository: Repository): Promise<void> {
    await repository.init();
}