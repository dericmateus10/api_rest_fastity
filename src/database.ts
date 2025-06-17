import { knex as setupKnex } from "knex";
import { env } from "./env/index";

export const config = {
    client: env.DATABASE_CLIENT,
    connection: env.DATABASE_CLIENT === "sqlite"
        ? {
            filename: env.DATABASE_URL,
        }
        : env.DATABASE_URL,
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
