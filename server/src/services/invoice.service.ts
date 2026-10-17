import pool from "../db.ts";

export type InvoiceStatus = "paid" | "pending";
export type InvoiceSituation = "paid" | "pending" | "overdue";

export interface Customer {
	id: number;
	name: string;
	email: string;
}

export interface Invoice {
	id: number;
	amount: number;
	status: InvoiceStatus;
	situation: InvoiceSituation;
	issueDate: string;
	dueDate: string;
	customer: Customer;
}

interface InvoiceRow {
	id: number;
	amount: number;
	status: InvoiceStatus;
	situation: InvoiceSituation;
	issue_date: string;
	due_date: string;
	customer_id: number;
	customer_name: string;
	customer_email: string;
}

const baseQuery = `
  SELECT
    invoices.id,
    invoices.amount,
    invoices.status,
    CASE
      WHEN invoices.status = 'paid' THEN 'paid'
      WHEN invoices.due_date < CURRENT_DATE THEN 'overdue'
      ELSE 'pending'
    END AS situation,
    invoices.issue_date::text AS issue_date,
    invoices.due_date::text  AS due_date,
    customers.id    AS customer_id,
    customers.name  AS customer_name,
    customers.email AS customer_email
  FROM invoices
  JOIN customers ON invoices.customer_id = customers.id
`;

function toInvoice(row: InvoiceRow): Invoice {
	return {
		id: row.id,
		amount: row.amount,
		status: row.status,
		situation: row.situation,
		issueDate: row.issue_date,
		dueDate: row.due_date,
		customer: {
			id: row.customer_id,
			name: row.customer_name,
			email: row.customer_email,
		},
	};
}

export async function findAllInvoices(): Promise<Invoice[]> {
	const { rows } = await pool.query<InvoiceRow>(
		`${baseQuery} ORDER BY invoices.issue_date DESC;`,
	);
	return rows.map(toInvoice);
}

export async function findInvoiceById(
	id: number,
): Promise<Invoice | undefined> {
	const { rows } = await pool.query<InvoiceRow>(
		`${baseQuery} WHERE invoices.id = $1;`,
		[id],
	);
	return rows[0] ? toInvoice(rows[0]) : undefined;
}
