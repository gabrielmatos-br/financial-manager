import { useEffect, useState } from "react";
import InvoiceTable from "./InvoiceTable.tsx";
import type { Invoice } from "./invoice.types.ts";

export default function InvoicesPage() {
	const [invoices, setInvoices] = useState<Invoice[]>([]);
	const [error, setError] = useState<string | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		async function getInvoices() {
			try {
				const response = await fetch("/api/invoices");
				if (!response.ok) {
					setError("Não foi possível carregar as faturas.");
					return;
				}
				setInvoices(await response.json());
			} catch {
				setError("Não foi possível carregar as faturas.");
			} finally {
				setLoading(false);
			}
		}
		getInvoices();
	}, []);

	if (loading) {
		return <div className="status-message">Carregando faturas...</div>;
	}

	if (error) {
		return (
			<div
				className="status-message"
				style={{ color: "var(--badge-overdue-text)" }}
			>
				{error}
			</div>
		);
	}

	return (
		<main className="app-container">
			<header>
				<h1 className="header-title">Financial Manager</h1>
				<p className="header-subtitle">Gestão de contas a receber</p>
			</header>

			<div className="table-container">
				<InvoiceTable invoices={invoices} />
			</div>
		</main>
	);
}
