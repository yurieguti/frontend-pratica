import "./header.css";
import Nav from "react-bootstrap/Nav";

let Header = () => {
  return (
    <Nav className="header justify-content-start" activeKey="/home">
      <Nav.Item>
        <img className="logo" src="bmn-mini.png"></img>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link className="item" href="/">
          Início
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link className="item" href="/bancos">
          Bancos
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link className="item" href="/listar-contas">
          Contas
        </Nav.Link>
      </Nav.Item>
    </Nav>
  );
};

export default Header;
