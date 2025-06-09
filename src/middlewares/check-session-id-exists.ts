import { FastifyReply, FastifyRequest } from "fastify";

export async function checkSessionIdExists(request: FastifyRequest, reply: FastifyReply) {
    const { sessionId } = request.cookies as { sessionId?: string };

    if (!sessionId) {
        return reply.status(401).send({
            error: "Unauthorized",
            message: "Session ID is required",
        });
    }

}