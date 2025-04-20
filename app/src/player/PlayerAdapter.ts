import { HlsPlayer } from "./HlsPlayer";
import type { PlayerInterface } from "./PlayerInterface";

export class PlayerAdapter {

    static builder(): PlayerInterface {
        const player = new HlsPlayer();
        return player;
    }
}