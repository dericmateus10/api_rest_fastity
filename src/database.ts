import { knex as setupKnex } from "knex";
import { env } from "./env/index";

export const config = {
    client: "sqlite3",
    connection: {
    filename: env.DATABASE_URL,
    },
    useNullAsDefault: true,
    pool: {
    min: 0,
    max: 10,
    },
    migrations: {
        extension: "ts",
        directory: "./db/migrations",
    },
}

export const knex = setupKnex(config);
