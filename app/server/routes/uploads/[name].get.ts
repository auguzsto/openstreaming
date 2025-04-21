import fs from "fs";

export default defineEventHandler(async (event) => {
    const name = getRouterParam(event, "name");
    const path = `/uploads/${name}`
    return sendStream(event, fs.createReadStream(path));
})