import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

process.env.NODE_ENV = "node";

const Pool = pg.Pool;

const config = `postgresql://${process.env.PG_USERNAME}:${process.env.PG_PASSWORD}@${process.env.PG_HOST}:${process.env.PG_PORT}/${process.env.PG_DATABASE}`;

const pool = new Pool({ connectionString: config });

export default pool;
