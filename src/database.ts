import { knex as setupKnex } from "knex";


export const config = {
    client: "sqlite3",
    connection: {
    filename: "./db/app.db",
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
