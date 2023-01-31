import axios from "axios";
import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { Button, Card, Col, Form, Row, Spinner, Table } from "react-bootstrap";

import "./listar-bancos.css";

const ListarBancos = ({ showSimpleMessage }) => {
	const [bancos, setData] = useState([]);
	const navigate = useNavigate();
	const urlBancos =
		"http://localhost:8000/Projetophpva2-master/bancos/leitura.php";

	const urlPesquisaBancos =
		"http://localhost:8000/Projetophpva2-master/bancos/pesquisar.php";

	const [filtrosBanco, setFiltrosBanco] = useState({
		nome: "",
		endereco: "",
		agencia: "",
		bandeira: "",
	});

	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		const fetchData = async () => {
			setIsLoading(true);

			const result = await axios(urlBancos);

			setData(result.data);
			setIsLoading(false);
		};

		fetchData();
	}, [urlBancos]);

	const onSearchClick = () => {
		let noFieldFilled =
			filtrosBanco.nome === "" && filtrosBanco.bandeira === "";

		if (noFieldFilled) {
			listBancos();
		} else {
			searchBancos();
		}
	};

	const listBancos = async () => {
		setIsLoading(true);

		await axios(urlBancos)
			.then((data) => {
				setData(data.data);
				resetFiltros();
				setIsLoading(false);
			})
			.catch((err) => {
				console.log(err);
				setIsLoading(false);
				setData([]);
			});
	};

	const searchBancos = async () => {
		setIsLoading(true);

		await axios
			.post(urlPesquisaBancos, JSON.stringify(filtrosBanco))
			.then((data) => {
				setData(data.data);
				resetFiltros();
				setIsLoading(false);
			})
			.catch((err) => {
				console.log(err);
				setIsLoading(false);
				setData([]);
			});
	};

	const showSimpleFeedbackMessage = (title, description, variant) => {
		showSimpleMessage(title, description, variant);
	};

	const closeSimpleFeedbackMessage = () => {};

	const handleFormChange = (event) => {
		let { name, value } = event.target;
		console.log("NOME CAMPO", name);
		console.log("Valor", value);

		let newFiltro = {
			...filtrosBanco,
			[name]: value,
		};
		setFiltrosBanco(newFiltro);
	};

	const resetFiltros = () => {
		setFiltrosBanco({
			nome: "",
			endereco: "",
			agencia: "",
			bandeira: "",
		});
	};

	const CriarConta = (selectedBanco) => {
		navigate("/criar-conta", { state: selectedBanco });
	};

	const VisualizarBanco = (selectedBanco) => {
		navigate("/visualizar-banco", { state: selectedBanco });
	};

	return (
		<div className="bancos">
			<h1>Bancos</h1>

			<Card className="bg-dark text-white card-data">
				<Card.Body>
					<Form>
						<Row>
							<Col>
								<Form.Control
									placeholder="Nome"
									name="nome"
									onChange={handleFormChange}
								/>
							</Col>
							<Col>
								<Form.Control
									placeholder="Bandeira"
									name="bandeira"
									onChange={handleFormChange}
								/>
							</Col>
							<Col
								className="row-button-search"
								onClick={onSearchClick}
							>
								<Button>Pesquisar banco</Button>
							</Col>
						</Row>
					</Form>
				</Card.Body>
			</Card>
			<div className="container-bancos">
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
									<Card.Title>Lista de bancos</Card.Title>
									<Button
										variant="secondary"
										size="lg"
										active
										onClick={() =>
											navigate("/criar-bancos")
										}
									>
										Criar banco
									</Button>
								</div>
								<Table striped bordered hover variant="dark">
									<thead>
										<tr>
											<th>#</th>
											<th>Nome</th>
											<th>Endereco</th>
											<th>Agencia</th>
											<th>Bandeira</th>
											<th>Ações</th>
										</tr>
									</thead>
									<tbody>
										{bancos.map((banco) => (
											<tr key={banco.id}>
												<td>{banco.id}</td>
												<td>{banco.nome}</td>
												<td>{banco.endereco}</td>
												<td>{banco.agencia}</td>
												<td>{banco.bandeira}</td>
												<td className="row-button">
													<Button
														onClick={() =>
															CriarConta(banco)
														}
													>
														Criar conta
													</Button>
													<Button
														onClick={() =>
															VisualizarBanco(
																banco
															)
														}
													>
														Visualizar banco
													</Button>
												</td>
											</tr>
										))}
									</tbody>
								</Table>
							</Card.Body>
						)}
					</Card>
				</div>
			</div>
		</div>
	);
};

export default ListarBancos;
