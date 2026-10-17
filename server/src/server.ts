import path from "node:path";
import express from "express";
import pool from "./db.ts";
import invoices from "./routes/invoice.route.ts";

const app = express();
const port = Number(process.env.PORT) || 3000;

// Caminho para o build do frontend (o Vite gera a pasta 'dist' dentro de 'web')
const distPath = path.join(import.meta.dirname, "../../web/dist");

app.use(express.json());

app.use((request, _response, next) => {
	console.log(`${request.method} ${request.url}`);
	next();
});

app.get("/api/health", async (_request, response) => {
	try {
		const { rows } = await pool.query<{ datname: string }>(
			"SELECT current_database() AS datname;",
		);
		response.status(200).json({ status: "ok", database: rows[0].datname });
	} catch (error) {
		console.error(error);
		response.status(500).json({
			error: { status: 500, message: "Servidor no ar, banco indisponível." },
		});
	}
});

// Rotas da API
app.use("/api/invoices", invoices);

// Serve os arquivos estáticos do frontend
app.use(express.static(distPath));

// Fallback: qualquer rota que não seja /api vai para o index.html (React Router assume)
app.use((request, response, next) => {
	if (request.path.startsWith("/api")) {
		return next(); // Deixa as rotas de API continuarem (e darem 404 se não existirem)
	}
	response.sendFile(path.join(distPath, "index.html"));
});

// Middleware de erro
app.use(
	(
		error: unknown,
		_request: express.Request,
		response: express.Response,
		_next: express.NextFunction,
	) => {
		console.error(error);
		response
			.status(500)
			.json({ error: { status: 500, message: "Erro interno do servidor." } });
	},
);

app.listen(port, () => {
	console.log(`Servidor rodando na porta ${port}`);
});
