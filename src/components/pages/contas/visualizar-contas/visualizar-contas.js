import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Navigate, useNavigate } from "react-router-dom";
import { Badge, Button, Card, Col, Row, Spinner, Table } from "react-bootstrap";

import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

import "./visualizar-contas.css";

const VisualizarConta = ({
	showConfirmationModal,
	showSimpleMessage,
	closeConfirmationModal,
}) => {
	const navigate = useNavigate();
	const location = useLocation();
	const urlContas =
		"http://localhost:8000/Projetophpva2-master/clientes/pesquisar.php";
	const urlContasUpdate =
		"http://localhost:8000/Projetophpva2-master/clientes/editar.php";
	const urlDeleteConta =
		"http://localhost:8000/Projetophpva2-master/clientes/deletar.php";

	const [isLoading, setIsLoading] = useState(false);
	const [showModalDeposito, setShowModalDeposito] = useState(false);
	const [showModalSaque, setShowModalSaque] = useState(false);

	const [contas, setContas] = useState([]);

	const onContinueDeleteConta = async () => {
		await axios
			.post(urlDeleteConta, JSON.stringify(location.state))
			.then((data) => {
				setIsLoading(false);
				showSimpleMessage(
					"Conta excluida",
					"Conta excluida com sucesso",
					"success"
				);
				closeConfirmationModal();
				navigate("/listar-contas");
			})
			.catch((err) => {
				setIsLoading(false);
				showSimpleMessage(
					"Conta não excluído",
					"Erro ao excluir Conta",
					"danger"
				);
				closeConfirmationModal();
				navigate("/listar-contas");
			});
	};

	const onCancelDeleteConta = () => {};

	const [messageToShow, setMessageToShow] = useState({
		title: "",
		description: "",
		variant: "",
		show: false,
	});

	const [contaToInsert, setContaToInsert] = useState({
		id: location.state.id,
		nome: location.state.nome,
		CPF: location.state.CPF,
		Endereco: location.state.Endereco,
		Conta: location.state.Conta,
		Agencia: location.state.Agencia,
		Saldo: location.state.Saldo,
	});

	const handleDepositoFormChange = (event) => {
		let { name, value } = event.target;
		if (value > 0) {
			let newFormValues = {
				...contaToInsert,
				[name]: parseInt(value) + parseInt(location.state.Saldo),
			};
			console.log("VALOR", newFormValues);
			setContaToInsert(newFormValues);
		}
	};

	const handleSaqueFormChange = (event) => {
		let { name, value } = event.target;
		if (value <= location.state.Saldo) {
			let newFormValues = {
				...contaToInsert,
				[name]: parseInt(location.state.Saldo) - parseInt(value),
			};
			console.log("VALOR", newFormValues);
			setContaToInsert(newFormValues);
		}
	};

	useEffect(() => {
		searchContas();
	}, [urlContas]);

	const searchContas = async () => {
		setIsLoading(true);

		await axios
			.post(
				urlContasUpdate,
				JSON.stringify({
					nome: "",
					CPF: "",
					Endereco: "",
					Conta: "",
					Agencia: location.state.agencia,
					Saldo: "",
				})
			)
			.then((data) => {
				setContas(data.data);
				setIsLoading(false);
			})
			.catch((err) => {
				console.log(err);
				setIsLoading(false);
				setContas([]);
			});
	};

	const atualizarSaldo = async () => {
		setIsLoading(true);

		await axios
			.post(urlContasUpdate, JSON.stringify(contaToInsert))
			.then((data) => {
				setIsLoading(false);
				showSimpleMessage(
					"Conta",
					"Saldo alterado com sucesso",
					"success"
				);
				navigate("/listar-contas");
			})
			.catch((err) => {
				setIsLoading(false);
				showSimpleMessage(
					"Conta",
					"Falha ao atualizar saldo",
					"danger"
				);
				navigate("/listar-contas");
			});
	};

	const onClickDeleteConta = () => {
		showConfirmationModal(
			"Deseja mesmo excluir a conta?",
			"Deseja prosseguir com a exclusão da conta? A ação não poderá ser desfeita.",
			onContinueDeleteConta,
			onCancelDeleteConta,
			true
		);
	};

	return (
		<div className="visualizar-conta">
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
			<Card className="bg-dark text-white">
				{isLoading ? (
					<Spinner
						animation="border"
						className="spinner"
						variant="warning"
					/>
				) : (
					<Card.Body className="card-data">
						<div className="row-card">
							<Card.Title>Operações da Conta</Card.Title>
							<Button
								variant="danger"
								size="lg"
								active
								onClick={() => onClickDeleteConta()}
							>
								Excluir Conta
							</Button>
						</div>

						<div className="card-operacoes-container">
							<Card
								className="bg-card-operacoes text-white"
								style={{ width: "15rem" }}
							>
								<Card.Img variant="top" src="deposito.png" />
								<Card.Body>
									<Button
										variant="primary"
										onClick={() =>
											setShowModalDeposito(true)
										}
									>
										Depósito
									</Button>
								</Card.Body>
							</Card>

							<Card
								className="bg-card-operacoes text-white"
								style={{ width: "15rem" }}
							>
								<Card.Img variant="top" src="saque.png" />
								<Card.Body>
									<Button
										variant="primary"
										onClick={() => setShowModalSaque(true)}
									>
										Saque
									</Button>
								</Card.Body>
							</Card>

							<Card
								className="bg-card-operacoes text-white"
								style={{ width: "15rem" }}
							>
								<Card.Img
									variant="top"
									src="transferencia.png"
								/>
								<Card.Body>
									<Button variant="primary">
										Transferência
									</Button>
								</Card.Body>
							</Card>
						</div>

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
					</Card.Body>
				)}
			</Card>

			<>
				<Modal
					show={showModalDeposito}
					onHide={() => setShowModalDeposito(false)}
				>
					<Modal.Header closeButton>
						<Modal.Title>Depósito</Modal.Title>
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
									name="Saldo"
									onChange={handleDepositoFormChange}
									autoFocus
								/>
							</Form.Group>
						</Form>
					</Modal.Body>
					<Modal.Footer>
						<Button
							variant="secondary"
							onClick={() => setShowModalDeposito(false)}
						>
							Fechar
						</Button>
						<Button variant="primary" onClick={atualizarSaldo}>
							Depositar
						</Button>
					</Modal.Footer>
				</Modal>
			</>

			<>
				<Modal
					show={showModalSaque}
					onHide={() => setShowModalSaque(false)}
				>
					<Modal.Header closeButton>
						<Modal.Title>Saque</Modal.Title>
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
									name="Saldo"
									onChange={handleSaqueFormChange}
									autoFocus
								/>
							</Form.Group>
						</Form>
					</Modal.Body>
					<Modal.Footer>
						<Button
							variant="secondary"
							onClick={() => setShowModalSaque(false)}
						>
							Fechar
						</Button>
						<Button variant="primary" onClick={atualizarSaldo}>
							Saque
						</Button>
					</Modal.Footer>
				</Modal>
			</>
		</div>
	);
};

export default VisualizarConta;
