import axios from "axios";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { Navigate, useNavigate } from "react-router-dom";
import { Badge, Button, Card, Col, Form, Row, Spinner } from "react-bootstrap";

import "./criar-bancos.css";

const CriarBancos = ({ showSimpleMessage }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const urlBancos =
    "http://localhost:8000/Projetophpva2-master/bancos/inserir.php";

  const [isLoading, setIsLoading] = useState(false);

  const [bancoToInsert, setBancoToInsert] = useState({
    id: "",
    nome: "",
    agencia: "",
    endereco: "",
    bandeira: "",
  });

  const handleFormChange = (event) => {
    let { name, value } = event.target;
    let newFormValues = {
      ...bancoToInsert,
      [name]: value,
    };
    console.log("VALOR", newFormValues);
    setBancoToInsert(newFormValues);
  };

  const createBanco = async () => {
    setIsLoading(true);

    await axios
      .post(urlBancos, JSON.stringify(bancoToInsert))
      .then((data) => {
        setIsLoading(false);
        showSimpleMessage(
          "Banco criado",
          "Banco criado com sucesso",
          "success"
        );
        navigate("/bancos");
      })
      .catch((err) => {
        setIsLoading(false);
        showSimpleMessage(
          "Banco não criado",
          "Erro ao criar o Banco",
          "danger"
        );
        navigate("/bancos");
      });
  };

  return (
    <div className="criar-bancos">
      {isLoading ? (
        <Spinner animation="border" className="spinner" variant="warning" />
      ) : (
        <Card className="bg-dark text-white">
          <Card.Body>
            <Card.Title>Dados do Banco</Card.Title>
            <Form>
              <Form.Group className="mb-3" controlId="formNome">
                <Form.Label>Nome</Form.Label>
                <Form.Control
                  name="nome"
                  type="text"
                  onChange={handleFormChange}
                  placeholder="Informe o nome da banco"
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formCPF">
                <Form.Label>Agencia</Form.Label>
                <Form.Control
                  name="agencia"
                  type="number"
                  onChange={handleFormChange}
                  placeholder="Informe a agencia do banco"
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formEndereco">
                <Form.Label>Endereço</Form.Label>
                <Form.Control
                  name="endereco"
                  type="text"
                  onChange={handleFormChange}
                  placeholder="Informe o endereço do banco"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Bandeira</Form.Label>
                <Form.Control
                  name="bandeira"
                  type="text"
                  onChange={handleFormChange}
                  placeholder="Informe a bandeira do banco"
                />
              </Form.Group>

              <Button variant="primary" onClick={createBanco}>
                Salvar
              </Button>
            </Form>
          </Card.Body>
        </Card>
      )}
    </div>
  );
};

export default CriarBancos;
