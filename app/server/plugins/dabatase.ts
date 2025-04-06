import { MongoDatabase } from "../MongoDatabase";
import { DatabaseInterface } from "../DatabaseInterface";

export default defineNitroPlugin(async (nitroApp) => {
    const database = new MongoDatabase();
    await initDatabase(database);
});

async function initDatabase(database: DatabaseInterface): Promise<void> {
    await database.init();
}