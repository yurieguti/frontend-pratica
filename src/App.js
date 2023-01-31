import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Header from "./components/layout/header/header";
import Footer from "./components/layout/footer/footer";
import Inicio from "./components/pages/inicio/inicio";
import ListarBancos from "./components/pages/bancos/listar-bancos/listar-bancos";
import CriarConta from "./components/pages/contas/criar-conta/criar-conta";
import VisualizarBanco from "./components/pages/bancos/visualizar-banco/visualizar-banco";
import SimpleMessage from "./components/layout/simple-message/simple-message";
import CriarBancos from "./components/pages/bancos/criar-bancos/criar-bancos";
import ConfirmationMessage from "./components/layout/confirmation-message/confirmation-message";
import ListarContas from "./components/pages/contas/listar-contas/listar-contas";
import VisualizarConta from "./components/pages/contas/visualizar-contas/visualizar-contas";
import TransferenciaContas from "./components/pages/contas/transferencia/transferencia";

function App() {
	const [messageToShow, setMessageToShow] = useState({
		title: "",
		description: "",
		variant: "",
		show: false,
	});

	const [confirmationMessage, setConfirmationMessage] = useState({
		title: "",
		description: "",
		onYesClick: null,
		onNoClick: null,
		show: false,
	});

	const showSimpleMessage = (title, description, variant) => {
		setMessageToShow({
			title: title,
			description: description,
			variant: variant,
			show: true,
		});
	};

	const closeSimpleMessage = () => {
		setMessageToShow({
			title: "",
			description: "",
			variant: "",
			show: false,
		});
	};

	const showConfirmationModal = (
		title,
		description,
		onYesClick,
		onNoCLick,
		show
	) => {
		setConfirmationMessage({
			title: title,
			description: description,
			onYesClick: onYesClick,
			onNoCLick: onNoCLick,
			show: show,
		});
		console.log("SHOW CONFIRMATION", confirmationMessage);
	};

	const closeConfirmationModal = () => {
		setConfirmationMessage({
			title: null,
			description: null,
			onYesClick: null,
			onNoCLick: null,
			show: false,
		});
	};

	return (
		<div>
			<ConfirmationMessage
				confirmationMessage={confirmationMessage}
				onCloseClick={closeConfirmationModal}
			></ConfirmationMessage>
			<div className="simple-message-box">
				<SimpleMessage
					messageToShow={messageToShow}
					onCloseClick={closeSimpleMessage}
				></SimpleMessage>
			</div>
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
								element={
									<ListarBancos
										showSimpleMessage={showSimpleMessage}
										showConfirmationModal={
											showConfirmationModal
										}
									/>
								}
							></Route>

							<Route
								path="/criar-bancos"
								element={
									<CriarBancos
										showSimpleMessage={showSimpleMessage}
									/>
								}
							></Route>

							<Route
								path="/listar-contas"
								element={
									<ListarContas
										showSimpleMessage={showSimpleMessage}
									/>
								}
							></Route>

							<Route
								path="/visualizar-banco"
								element={
									<VisualizarBanco
										showSimpleMessage={showSimpleMessage}
										showConfirmationModal={
											showConfirmationModal
										}
										closeConfirmationModal={
											closeConfirmationModal
										}
									/>
								}
							></Route>

							<Route
								path="/criar-conta"
								element={
									<CriarConta
										showSimpleMessage={showSimpleMessage}
										showConfirmationModal={
											showConfirmationModal
										}
									/>
								}
							></Route>

							<Route
								path="/criar-bancos"
								element={
									<CriarBancos
										showSimpleMessage={showSimpleMessage}
									/>
								}
							></Route>

							<Route
								path="/visualizar-conta"
								element={
									<VisualizarConta
										showSimpleMessage={showSimpleMessage}
										showConfirmationModal={
											showConfirmationModal
										}
										closeConfirmationModal={
											closeConfirmationModal
										}
									/>
								}
							></Route>

							<Route
								path="/transferir-conta"
								element={
									<TransferenciaContas
										showSimpleMessage={showSimpleMessage}
										showConfirmationModal={
											showConfirmationModal
										}
										closeConfirmationModal={
											closeConfirmationModal
										}
									/>
								}
							></Route>
						</Routes>
					</BrowserRouter>
				</div>

				<div className="footer">
					<Footer></Footer>
				</div>
			</div>
		</div>
	);
}

export default App;
