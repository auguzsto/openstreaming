export interface PlayerInterface {
    play(videoElment: HTMLMediaElement, source: string): Promise<void>
}