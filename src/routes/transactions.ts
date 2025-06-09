import { FastifyInstance } from 'fastify';
import { knex } from '../database';

export async function transactionsRoutes(app: FastifyInstance) {
app.get("/", async () => {
  const transactions = await knex('transactions').insert({
    id: crypto.randomUUID(),
    title: 'Test Transaction 2',
    amount: 100.00,
  }).returning(['*']);
  return  transactions;
}
);
}