export interface JwtInterface {
    secret: string;
    sign(data: object, expires?: number): string    ;
    verify(token: string): boolean;
    decode(token: string): object;
}