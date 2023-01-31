import axios from "axios";
import { useEffect, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import {
	Badge,
	Button,
	Card,
	Col,
	Form,
	Modal,
	Row,
	Spinner,
	Table,
} from "react-bootstrap";

import "./transferencia.css";

const TransferenciaContas = ({ showSimpleMessage }) => {
	const [contas, setData] = useState([]);
	const [showModalTransferencia, setShowModalTransferencia] = useState(false);
	const [saldoParaTransferir, setSaldoParaTransferir] = useState({
		Saldo: 0,
	});
	const navigate = useNavigate();
	const location = useLocation();

	const urlContas =
		"http://localhost:8000/Projetophpva2-master/clientes/leitura.php";

	const urlContasUpdate =
		"http://localhost:8000/Projetophpva2-master/clientes/editar.php";

	const [contaParaTransferir, setContaParaTransferir] = useState({
		id: "",
		nome: "",
		CPF: "",
		Endereco: "",
		Conta: "",
		Agencia: "",
		Data_de_Nascimento: "",
		Saldo: "",
	});

	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		const fetchData = async () => {
			setIsLoading(true);

			const result = await axios(urlContas);

			setData(result.data);
			setIsLoading(false);
		};

		fetchData();
	}, [urlContas]);

	const listContas = async () => {
		setIsLoading(true);

		await axios(urlContas)
			.then((data) => {
				setData(data.data);
				setIsLoading(false);
			})
			.catch((err) => {
				console.log(err);
				setIsLoading(false);
				setData([]);
			});
	};

	const handleFormChange = (event) => {
		let { value } = event.target;
		console.log(saldoParaTransferir);
		setSaldoParaTransferir({ Saldo: value });
	};

	const iniciarTransferencia = (contaSelecionada) => {
		setShowModalTransferencia(true);
		setContaParaTransferir(contaSelecionada);
	};

	const transferir = () => {
		setShowModalTransferencia(false);
		let saldoParaTransferirParaConta = parseInt(saldoParaTransferir.Saldo);
		let saldoContaAtual = parseInt(location.state.Saldo);

		if (saldoParaTransferirParaConta > saldoContaAtual) {
			showSimpleMessage(
				"Impossível realizar transferencia",
				"Saldo informado é maior que o saldo disponível na conta",
				"danger"
			);
		} else {
			let novoSaldoContaAtual =
				saldoContaAtual - saldoParaTransferirParaConta;
			let saldoContaParaTransferir =
				parseInt(contaParaTransferir.Saldo) +
				saldoParaTransferirParaConta;

			let contaTransferencia = {
				...location.state,
				Saldo: novoSaldoContaAtual,
			};
			let contaTransfererida = {
				...contaParaTransferir,
				Saldo: saldoContaParaTransferir,
			};
			realizarTransferencia(contaTransferencia, contaTransfererida);
		}
	};

	const realizarTransferencia = async (
		contaTransferencia,
		contaTransferida
	) => {
		setIsLoading(true);

		await axios
			.post(urlContasUpdate, JSON.stringify(contaTransferencia))
			.then((data) => {
				setIsLoading(false);
				atualizarContaTransferida(contaTransferida);
			})
			.catch((err) => {
				setIsLoading(false);
				showSimpleMessage(
					"Conta",
					"Falha ao transferir saldo",
					"danger"
				);
				navigate("/listar-contas");
			});
	};

	const atualizarContaTransferida = async (contaTransfererida) => {
		await axios
			.post(urlContasUpdate, JSON.stringify(contaTransfererida))
			.then((data) => {
				setIsLoading(false);
				showSimpleMessage(
					"Conta",
					"Saldo transferido com sucesso",
					"success"
				);
				navigate("/listar-contas");
			})
			.catch((err) => {
				setIsLoading(false);
				showSimpleMessage(
					"Conta",
					"Falha ao transferir saldo",
					"danger"
				);
				navigate("/listar-contas");
			});
	};

	const VisualizarConta = (selectedConta) => {
		navigate("/visualizar-conta", { state: selectedConta });
	};

	return (
		<div className="transferencia">
			<Card className="bg-dark text-white">
				<Card.Body className="card-data">
					<Card.Title className="row-card">
						Conta: {location.state.nome}{" "}
						<Badge bg="secondary">{location.state.conta}</Badge>
					</Card.Title>

					<Row>
						<Col>CPF: {location.state.CPF}</Col>
						<Col>Número da agência: {location.state.Agencia}</Col>
					</Row>

					<Row>
						<Col>Saldo (R$): {location.state.Saldo}</Col>
						<Col>Endereço: {location.state.Endereco}</Col>
					</Row>
				</Card.Body>
			</Card>
			<h1>Selecionar conta para transferir</h1>
			<div className="container-contas">
				<div className="container-table">
					<Card className="bg-dark text-white card-data">
						{isLoading ? (
							<Spinner
								animation="border"
								className="spinner"
								variant="warning"
							/>
						) : (
							<Card.Body>
								<div className="row-card">
									<Card.Title>Lista de contas</Card.Title>
								</div>
								<Table striped bordered hover variant="dark">
									<thead>
										<tr>
											<th>#</th>
											<th>Nome</th>
											<th>Endereco</th>
											<th>Agencia</th>
											<th>CPF</th>
											<th>Conta</th>
											<th>Ações</th>
										</tr>
									</thead>
									<tbody>
										{contas.map((conta) => (
											<tr key={conta.id}>
												<td>{conta.id}</td>
												<td>{conta.nome}</td>
												<td>{conta.Endereco}</td>
												<td>{conta.Agencia}</td>
												<td>{conta.CPF}</td>
												<td>{conta.Conta}</td>
												<td className="row-button">
													<Button
														disabled={
															conta.id ===
															location.state.id
														}
														onClick={() =>
															iniciarTransferencia(
																conta
															)
														}
													>
														Transferir
													</Button>
												</td>
											</tr>
										))}
									</tbody>
								</Table>
							</Card.Body>
						)}
						<div className="row-card">
							<Button
								variant="primary"
								size="lg"
								active
								onClick={() => navigate("/listar-contas")}
							>
								Voltar
							</Button>
						</div>
					</Card>
				</div>
			</div>

			<>
				<Modal
					show={showModalTransferencia}
					onHide={() => setShowModalTransferencia(false)}
				>
					<Modal.Header closeButton>
						<Modal.Title>Trnasferencia</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<Form>
							<Form.Group
								className="mb-3"
								controlId="exampleForm.ControlInput1"
							>
								<Form.Label>Valor (R$)</Form.Label>
								<Form.Control
									type="number"
									placeholder="0"
									name="saldo"
									min={1}
									max={location.state.saldo}
									onChange={handleFormChange}
									autoFocus
								/>
							</Form.Group>
						</Form>
					</Modal.Body>
					<Modal.Footer>
						<Button
							variant="secondary"
							onClick={() => setShowModalTransferencia(false)}
						>
							Fechar
						</Button>
						<Button variant="primary" onClick={() => transferir()}>
							Transferir
						</Button>
					</Modal.Footer>
				</Modal>
			</>
		</div>
	);
};

export default TransferenciaContas;
