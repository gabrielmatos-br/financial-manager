import { formatCurrency, formatDate, situationLabel } from "@/shared/format.ts";
import type { Invoice } from "./invoice.types.ts";

interface InvoiceRowProps {
	invoice: Invoice;
}

export default function InvoiceRow(props: InvoiceRowProps) {
	const { invoice } = props;
	const { customer, amount, issueDate, dueDate, situation } = invoice;

	return (
		<tr>
			<td>{customer.name}</td>
			<td>{formatCurrency(amount)}</td>
			<td>{formatDate(issueDate)}</td>
			<td>{formatDate(dueDate)}</td>
			<td>
				{/* Usamos a classe dinâmica baseada na situação */}
				<span className={`badge badge-${situation}`}>
					{situationLabel(situation)}
				</span>
			</td>
		</tr>
	);
}
