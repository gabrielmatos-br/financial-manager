import InvoiceRow from "./InvoiceRow.tsx";
import type { Invoice } from "./invoice.types.ts";

interface InvoiceTableProps {
	invoices: Invoice[];
}

export default function InvoiceTable(props: InvoiceTableProps) {
	return (
		<table>
			<thead>
				<tr>
					<th>Cliente</th>
					<th>Valor</th>
					<th>Emissão</th>
					<th>Vencimento</th>
					<th>Situação</th>
				</tr>
			</thead>
			<tbody>
				{props.invoices.map((invoice) => (
					<InvoiceRow key={invoice.id} invoice={invoice} />
				))}
			</tbody>
		</table>
	);
}
