import { FastifyInstance } from 'fastify';
import { randomUUID } from 'node:crypto';
import { z } from 'zod';
import { knex } from '../database';
import { checkSessionIdExists } from '../middlewares/check-session-id-exists';

export async function transactionsRoutes(app: FastifyInstance) {

app.addHook('preHandler', async (request, reply) => {
    console.log(`Request received: ${request.method} ${request.url}`);
    // You can add more logging or processing here if needed
});

app.get("/", {
    preHandler: [checkSessionIdExists],
}, 
    async (request, reply) => {

    const {sessionId}  = request.cookies
    const transactions = await knex('transactions')
    .where('session_id', sessionId)
    .select()

    return {transactions};  
});

app.get("/:id", 
    {
    preHandler: [checkSessionIdExists],
    }, 
    async (request) => {
    const {sessionId}  = request.cookies    
    const getTransactionParamsSchema = z.object({
        id: z.string().uuid(),
    });
    const { id } = getTransactionParamsSchema.parse(request.params);

    const transaction = await knex('transactions')
    .where(
        {
            id,
            session_id: sessionId,
        }   
    )
    .first();

    return {
        transaction,
    };
});

app.get("/summary", 
    {
    preHandler: [checkSessionIdExists],
    }, 
    async (request) => {
    const { sessionId }  = request.cookies;
    const summary = await knex('transactions')
    .where('session_id', sessionId)
    .sum('amount', { as: 'amount' })
    .first();

    return {
        summary,
    };
});


app.post("/", async (request, reply) => {
    const createTransactionsBodySchema = z.object({
        title: z.string().min(1),
        type: z.enum(['credit', 'debit']),
        amount: z.number(),
        
    });
    const {title, amount, type} = createTransactionsBodySchema.parse(request.body);

    let session_id = request.cookies.sessionId;
    if (!session_id) {
        session_id = randomUUID();
        reply.cookie('sessionId', session_id, {
            path: '/',
            maxAge: 60 * 60 * 24 * 7, // 7 days
        });
    }

    await knex('transactions')
    .insert({
        id: randomUUID(),
        title,
        amount: type === 'credit' ? amount : -amount,
        created_at: new Date(),
        session_id,
    })


  return  reply.status(201).send();
}
);
}