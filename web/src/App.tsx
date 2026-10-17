import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import InvoicesPage from "./features/invoices/InvoicesPage.tsx";

export default function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<InvoicesPage />} />
				{/* Qualquer outra rota redireciona para a raiz */}
				<Route path="*" element={<Navigate to="/" replace />} />
			</Routes>
		</BrowserRouter>
	);
}
