import { AuthPayload } from "~/src/auth/AuthPayload";
import { JwtAdapter } from "~/src/jwt/JwtAdapter";

function isRoutePublic(path: string): boolean {
    if (path.startsWith("/api/public")) {
        return true;
    }

    return false;
}

export default defineEventHandler(async (event) => {
    if (isRoutePublic(event.path)) {
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