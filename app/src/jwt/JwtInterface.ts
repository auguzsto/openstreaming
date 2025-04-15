export interface JwtInterface {
    sign(data: string | Buffer | object, secret: string, expires?: number): string    ;
    verify(token: string, secret: string): boolean;
    decode(token: string): object;
}