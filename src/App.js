import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Header from "./components/layout/header/header";
import Footer from "./components/layout/footer/footer";
import Inicio from "./components/pages/inicio/inicio";
import Bancos from "./components/pages/bancos/listar-bancos/listar-bancos";
import ListarBancos from "./components/pages/bancos/listar-bancos/listar-bancos";

function App() {
	return (
		<div className="app-container">
			<div className="header">
				<Header></Header>
			</div>

			<div className="page-content">
				<BrowserRouter>
					<Routes>
						<Route path="/" element={<Inicio />}></Route>

						<Route
							path="/bancos"
							element={<ListarBancos />}
						></Route>
					</Routes>
				</BrowserRouter>
			</div>

			<div className="footer">
				<Footer></Footer>
			</div>
		</div>
	);
}

export default App;
