import axios from "axios";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { Button, Col, Form, Row, Spinner, Table } from "react-bootstrap";

import "./listar-bancos.css";
import SimpleMessage from "../../../layout/simple-message/simple-message";

const ListarBancos = () => {
	const [bancos, setData] = useState([]);
	const urlBancos =
		"http://localhost:8000/bancos/leitura.php";

	const urlPesquisaBancos =
		"http://localhost:8000/bancos/pesquisar.php";

	const [filtrosBanco, setFiltrosBanco] = useState({
		nome: "",
		endereco: "",
		agencia: "",
		bandeira: "",
	});

	const [isLoading, setIsLoading] = useState(false);
	const [messageToShow, setMessageToShow] = useState({
		title: "",
		description: "",
		variant: "",
		show: false,
	});

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

	const criarConta = (selectedBanco) => {
		Navigate("/criarConta", { state: selectedBanco });
	};

	return (
		<div className="bancos">
			<SimpleMessage
				className="spinner"
				messageToShow={messageToShow}
				onCloseClick={closeSimpleMessage}
			></SimpleMessage>
			<h1>Bancos</h1>
			{isLoading ? (
				<Spinner animation="border" variant="warning" />
			) : (
				<div className="container-bancos">
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
							<Col className="row-button" onClick={onSearchClick}>
								<Button>Pesquisar banco</Button>
							</Col>
						</Row>
					</Form>
					<div className="container-table">
						--
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
											<Button>Criar conta</Button>
											<Button variant="danger">
												Apagar banco
											</Button>
										</td>
									</tr>
								))}
							</tbody>
						</Table>
					</div>
				</div>
			)}
		</div>
	);
};

export default ListarBancos;
