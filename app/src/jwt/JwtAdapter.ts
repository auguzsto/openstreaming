import { JwtInterface } from "./JwtInterface";
import { JwtJsonWebToken } from "./JwtJsonWebToken";

export class JwtAdapter {
    
    static builder(): JwtInterface {
        const jwt = new JwtJsonWebToken();
        return jwt;
    }
}