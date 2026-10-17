import { Pool } from "pg";

const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
	throw new Error("A variável DATABASE_URL não está disponível.");
}

const pool = new Pool({
	connectionString: DATABASE_URL,
	ssl: { rejectUnauthorized: false },
});

export default pool;
