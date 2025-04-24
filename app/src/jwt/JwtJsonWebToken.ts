import jsonwebtoken from 'jsonwebtoken';
import type { JwtInterface } from "./JwtInterface";
const { sign, decode, verify } = jsonwebtoken;

export class JwtJsonWebToken implements JwtInterface {
    secret: string = `${process.env.JWT_SECRET}`

    sign(data: string | Buffer | object, expires: number = 3600): string {
        const token: string = sign(data, this.secret, {
            expiresIn: expires
        })

        return token;
    }

    verify(token: string): boolean {
        let isValid = true;
        verify(token, this.secret, (error, _) => {
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