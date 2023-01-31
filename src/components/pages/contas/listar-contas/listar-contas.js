import axios from "axios";
import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { Button, Card, Col, Form, Row, Spinner, Table } from "react-bootstrap";

import "./listar-contas.css";

const ListarContas = ({ showSimpleMessage }) => {
  const [contas, setData] = useState([]);
  const navigate = useNavigate();
  const urlContas =
    "http://localhost:8000/Projetophpva2-master/clientes/leitura.php";

  const urlPesquisaContas =
    "http://localhost:8000/Projetophpva2-master/clientes/pesquisar.php";

  const [filtrosConta, setFiltrosConta] = useState({
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

  const onSearchClick = () => {
    let noFieldFilled =
      filtrosConta.nome === "" && filtrosConta.bandeira === "";

    if (noFieldFilled) {
      listContas();
    } else {
      searchContas();
    }
  };

  const listContas = async () => {
    setIsLoading(true);

    await axios(urlContas)
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

  const searchContas = async () => {
    setIsLoading(true);

    await axios
      .post(urlPesquisaContas, JSON.stringify(filtrosConta))
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
      ...filtrosConta,
      [name]: value,
    };
    setFiltrosConta(newFiltro);
  };

  const resetFiltros = () => {
    setFiltrosConta({
      id: "",
      nome: "",
      CPF: "",
      Endereco: "",
      Conta: "",
      Agencia: "",
      Data_de_Nascimento: "",
      Saldo: "",
    });
  };

  
  const VisualizarConta = (selectedConta) => {
    navigate("/visualizar-conta", { state: selectedConta });
  };


  return (
    <div className="contas">
      <h1>Contas</h1>

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
              
              <Col className="row-button-search" onClick={onSearchClick}>
                <Button>Pesquisar contas</Button>
              </Col>
            </Row>
          </Form>
        </Card.Body>
      </Card>
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
                          <Button onClick={() => VisualizarConta(conta)}>
                            Gerenciar conta
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

export default ListarContas;
