import { DatabaseInterface } from "~/src/database/DatabaseInterface";
import { MongoDatabase } from "~/src/database/MongoDatabase";

export default defineNitroPlugin(async (nitroApp) => {
    const database = new MongoDatabase();
    await initDatabase(database);
});

async function initDatabase(database: DatabaseInterface): Promise<void> {
    await database.init();
}