import jsonwebtoken from 'jsonwebtoken';
import type { JwtInterface } from "./JwtInterface";
const { sign, decode, verify } = jsonwebtoken;

export class JwtJsonWebToken implements JwtInterface {

    sign(data: string | Buffer | object, secret: string, expires?: number): string {
        const token: string = sign(data, secret, {
            expiresIn: expires
        })

        return token;
    }

    verify(token: string, secret: string): boolean {
        let isValid = true;
        verify(token, secret, (error, _) => {
            if (error) {
                isValid = false;
            }
        })
        
        return isValid;
    }
    
    decode(token: string): object {
        return decode(token) as object;
    }
}