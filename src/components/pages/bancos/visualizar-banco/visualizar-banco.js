import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Badge, Button, Card, Col, Row, Spinner, Table } from "react-bootstrap";

import "./visualizar-banco.css";

const VisualizarBanco = ({
	showConfirmationModal,
	showSimpleMessage,
	closeConfirmationModal,
}) => {
	const navigate = useNavigate();
	const location = useLocation();
	const urlContas =
		"http://localhost:8000/Projetophpva2-master/clientes/clientes-banco.php";

	const urlDeleteBanco =
		"http://localhost:8000/Projetophpva2-master/bancos/deletar.php";

	const [isLoading, setIsLoading] = useState(false);

	const [contas, setContasBanco] = useState([]);

	useEffect(() => {
		searchContas();
	}, [urlContas]);

	const onContinueDeleteBanco = async () => {
		await axios
			.post(urlDeleteBanco, JSON.stringify(location.state))
			.then((data) => {
				setIsLoading(false);
				showSimpleMessage(
					"Banco excluido",
					"Banco excluido com sucesso",
					"success"
				);
				closeConfirmationModal();
				navigate("/bancos");
			})
			.catch((err) => {
				setIsLoading(false);
				showSimpleMessage(
					"Banco não excluído",
					"Erro ao excluir banco",
					"danger"
				);
				closeConfirmationModal();
				navigate("/bancos");
			});
	};

	const onCancelDeleteBanco = () => {};

	const onClickDeleteBanco = () => {
		showConfirmationModal(
			"Deseja mesmo excluir o banco?",
			"Deseja prosseguir com a exclusão do banco? A ação não poderá ser desfeita.",
			onContinueDeleteBanco,
			onCancelDeleteBanco,
			true
		);
	};

	const bancoHasAnyAccount = () => {
		return contas && contas.length > 0;
	};

	const searchContas = async () => {
		setIsLoading(true);

		await axios
			.post(
				urlContas,
				JSON.stringify({
					id: location.state.agencia,
				})
			)
			.then((data) => {
				setContasBanco(data.data);
				setIsLoading(false);
			})
			.catch((err) => {
				console.log(err);
				setIsLoading(false);
				setContasBanco([]);
			});
	};

	return (
		<div className="visualizar-banco">
			<Card className="bg-dark text-white">
				<Card.Body className="card-data">
					<Card.Title className="row-card">
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
							<Card.Title>Lista de contas do banco</Card.Title>
							<Button
								variant="danger"
								size="lg"
								active
								disabled={bancoHasAnyAccount()}
								onClick={() => onClickDeleteBanco()}
							>
								Excluir banco
							</Button>
						</div>
						<Table striped bordered hover variant="dark">
							<thead>
								<tr>
									<th>Nome do cliente</th>
									<th>Endereço</th>
									<th>CPF</th>
									<th>Número da conta</th>
									<th>Agencia</th>
								</tr>
							</thead>
							<tbody>
								{contas.map((conta) => (
									<tr key={conta.id}>
										<td>{conta.nome}</td>
										<td>{conta.Endereco}</td>
										<td>{conta.CPF}</td>
										<td>{conta.Conta}</td>
										<td>{conta.Agencia}</td>
									</tr>
								))}
							</tbody>
						</Table>
						<div className="row-card">
							<Button
								variant="primary"
								size="lg"
								active
								onClick={() => navigate("/bancos")}
							>
								Voltar
							</Button>
						</div>
					</Card.Body>
				)}
			</Card>
		</div>
	);
};

export default VisualizarBanco;
