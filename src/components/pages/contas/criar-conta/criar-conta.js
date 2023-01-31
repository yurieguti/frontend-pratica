import axios from "axios";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { Navigate, useNavigate } from "react-router-dom";
import { Badge, Button, Card, Col, Form, Row, Spinner } from "react-bootstrap";

import "./criar-conta.css";

const CriarConta = ({ showSimpleMessage }) => {
	const navigate = useNavigate();
	const location = useLocation();
	const urlContas =
		"http://localhost:8000/Projetophpva2-master/clientes/inserir.php";

	const [isLoading, setIsLoading] = useState(false);

	const [contaToInsert, setContaToInsert] = useState({
		nome: "",
		CPF: "",
		Endereco: "",
		Conta: "",
		Agencia: "",
		Saldo: 0,
	});

	const handleFormChange = (event) => {
		let { name, value } = event.target;
		let newFormValues = {
			...contaToInsert,
			[name]: value,
		};
		console.log("VALOR", newFormValues);
		setContaToInsert(newFormValues);
	};

	const createContaCliente = async () => {
		setIsLoading(true);

		let agenciaBanco = location.state.agencia;
		contaToInsert.Agencia = agenciaBanco;

		await axios
			.post(urlContas, JSON.stringify(contaToInsert))
			.then((data) => {
				setIsLoading(false);
				showSimpleMessage(
					"Conta criada",
					"Conta criado com sucesso",
					"success"
				);
				navigate("/visualizar-banco", { state: location.state });
			})
			.catch((err) => {
				setIsLoading(false);
				showSimpleMessage(
					"Conta não criada",
					"Erro ao criar a conta",
					"danger"
				);
				navigate("/bancos");
			});
	};

	return (
		<div className="criar-conta">
			<Card className="bg-dark text-white">
				<Card.Body>
					<Card.Title className="title">
						Banco: {location.state.nome}{" "}
						<Badge bg="secondary">{location.state.bandeira}</Badge>
					</Card.Title>

					<Row>
						<Col>Nome do banco: {location.state.nome}</Col>
						<Col>Número da agência: {location.state.agencia}</Col>
					</Row>

					<Row>
						<Col>Bandeira: {location.state.bandeira}</Col>
						<Col>Endereço: {location.state.endereco}</Col>
					</Row>
				</Card.Body>
			</Card>
			{isLoading ? (
				<Spinner
					animation="border"
					className="spinner"
					variant="warning"
				/>
			) : (
				<Card className="bg-dark text-white">
					<Card.Body>
						<Card.Title>Dados do cliente</Card.Title>
						<Form>
							<Form.Group className="mb-3" controlId="formNome">
								<Form.Label>Nome</Form.Label>
								<Form.Control
									name="nome"
									type="text"
									onChange={handleFormChange}
									placeholder="Informe o nome da cliente"
								/>
							</Form.Group>

							<Form.Group className="mb-3" controlId="formCPF">
								<Form.Label>CPF</Form.Label>
								<Form.Control
									name="CPF"
									type="text"
									onChange={handleFormChange}
									placeholder="Informe o CPF do cliente"
								/>
							</Form.Group>

							<Form.Group
								className="mb-3"
								controlId="formEndereco"
							>
								<Form.Label>Endereço</Form.Label>
								<Form.Control
									name="Endereco"
									type="text"
									onChange={handleFormChange}
									placeholder="Informe o endereço do cliente"
								/>
							</Form.Group>

							<Button
								variant="primary"
								onClick={createContaCliente}
							>
								Salvar
							</Button>
						</Form>
					</Card.Body>
				</Card>
			)}
		</div>
	);
};

export default CriarConta;
