import fastify from 'fastify';
import crypto from 'node:crypto';
import { knex } from './database';

const app = fastify()

app.get("/", async () => {
  const transactions = await knex('transactions').insert({
    id: crypto.randomUUID(),
    title: 'Test Transaction 2',
    amount: 100.00,
  }).returning(['*']);
  return  transactions;
}
);

app.listen({ port: 3333,}).then(() => {
  console.log('HTTP server running on http://localhost:3333');
})