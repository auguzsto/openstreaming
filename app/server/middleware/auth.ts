import { AuthPayload } from "~/src/auth/AuthPayload";
import { JwtAdapter } from "~/src/jwt/JwtAdapter";

function isRoutesAllowed(path: string): boolean {
    let result = false;
    let routesAllowed = [
        "/api/auth/signup",
        "/api/auth/signin",
        "/api/auth/stream",
        "/api/stream/publish",
        "/api/stream/done",
        "/api/stream/lives"
    ];
    
    routesAllowed.forEach((route) => {
        if (path.includes(route)) {
            result = true;
        }
    })

    return result;
}

export default defineEventHandler(async (event) => {
    if (isRoutesAllowed(event.path)) {
        return;
    }
    
    const authorization = getHeader(event, "authorization");
    const jwt = JwtAdapter.builder();
    const token = `${authorization?.split("Bearer")[1].trim()}`;
    const secret = `${process.env.JWT_SECRET}`;
    const isTokenValid = jwt.verify(token, secret);
    
    if (!isTokenValid) {
        setResponseStatus(event, 403)
        return { message: "Acesso negado" }
    }
    
    const payload = jwt.decode(token) as AuthPayload;
    event.context.auth = { id: payload.id };
});