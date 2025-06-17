import { defineConfig } from 'tsup';

export default defineConfig({
  entry: [
    'src/app.ts',
    'src/database.ts',
    'src/server.ts',
    'src/@types/knex.d.ts',
    'src/env/index.ts',
    'src/middlewares/check-session-id-exists.ts',
    'src/routes/transactions.ts',
  ],
  target: 'es2016',
  format: ['cjs'],
  external: [
    'mysql',
    'mysql2',
    'oracledb',
    'better-sqlite3',
    'tedious'
  ],
});