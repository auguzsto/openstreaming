import { AuthPayload } from "~/src/auth/AuthPayload";
import { JwtAdapter } from "~/src/jwt/JwtAdapter";
import { EventHandlerRequest, H3Event } from "h3";

export default defineEventHandler(async (event) => {
    if (isNotAllowedPrivatePage(event)) {
        throw createError({
            statusCode: 403,
            message: "Acesso negado"
        })
    }
    
    if (isRoutePublic(event)) {
        return;
    }
    
    const authorization = getHeader(event, "authorization");
    const jwt = JwtAdapter.builder();
    const token = `${authorization?.split("Bearer")[1].trim()}`;
    
    if (!jwt.verify(token)) {
        setResponseStatus(event, 403)
        return { message: "Acesso negado" }
    }
    
    const payload = jwt.decode(token) as AuthPayload;
    event.context.auth = { id: payload.id };
});

function isRoutePublic(event: H3Event<EventHandlerRequest>): boolean {
    if (event.path.startsWith("/api/public")) {
        return true;
    }

    if (!event.path.startsWith("/api")) {
        return true;
    }

    return false;
}

function isNotAllowedPrivatePage(event: H3Event<EventHandlerRequest>): boolean {
    if(event.path.startsWith("/dashboard") && isNotAuthorized(event)) {
        return true;
    }

    return false;
}

function isNotAuthorized(event: H3Event<EventHandlerRequest>): boolean {
    const token = getCookie(event, "Authorization") as string;
    const jwt = JwtAdapter.builder();
    if (!jwt.verify(token)) {
        return true;
    }

    return false;
}