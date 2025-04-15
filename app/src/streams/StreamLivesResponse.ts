import type { Stream } from "./Stream";

export class StreamLivesResponse {
    name: string;

    constructor(data: Stream) {
        this.name = data.name
    }
}