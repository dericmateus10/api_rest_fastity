import { FastifyInstance } from 'fastify';
import { randomUUID } from 'node:crypto';
import { z } from 'zod';
import { knex } from '../database';

export async function transactionsRoutes(app: FastifyInstance) {
app.post("/", async (request, reply) => {
    const createTransactionsBodySchema = z.object({
        title: z.string().min(1),
        type: z.enum(['credit', 'debit']),
        amount: z.number(),
        
    });
    const {title, amount, type} = createTransactionsBodySchema.parse(request.body);
    await knex('transactions')
    .insert({
        id: randomUUID(),
        title,
        amount: type === 'credit' ? amount : -amount,
        created_at: new Date(),
    })


  return  reply.status(201).send();
}
);
}