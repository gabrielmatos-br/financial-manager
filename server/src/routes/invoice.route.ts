import { Router } from "express";
import {
	findAllInvoices,
	findInvoiceById,
} from "../services/invoice.service.ts";

const router = Router();

router.get("/", async (_request, response) => {
	try {
		const invoices = await findAllInvoices();
		response.status(200).json(invoices);
	} catch (error) {
		console.error(error);
		response.status(500).json({
			error: {
				status: 500,
				message: "Não foi possível carregar as faturas.",
			},
		});
	}
});

router.get("/:id", async (request, response) => {
	try {
		const id = Number(request.params.id);

		if (!Number.isInteger(id) || id <= 0) {
			response
				.status(400)
				.json({ error: { status: 400, message: "Identificador inválido." } });
			return;
		}

		const invoice = await findInvoiceById(id);

		if (!invoice) {
			response
				.status(404)
				.json({ error: { status: 404, message: "Fatura não encontrada." } });
			return;
		}

		response.status(200).json(invoice);
	} catch (error) {
		console.error(error);
		response.status(500).json({
			error: {
				status: 500,
				message: "Não foi possível carregar as faturas.",
			},
		});
	}
});

export default router;
