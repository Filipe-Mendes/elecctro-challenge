import knex from 'knex';
import dotenv from 'dotenv';

dotenv.config();

const knexConnection = knex({
    client: 'pg',
    connection: {
        // connectionString: config.DATABASE_URL,
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        user: process.env.DB_USER,
        database: process.env.DB_NAME,
        password: process.env.DB_PASSWORD
        // ssl: config.DB_SSL ? { rejectUnauthorized: false } : false
    }
});

export default knexConnection;
