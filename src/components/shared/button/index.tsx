import React from "react";
import "./style.scss";

class Botao extends React.Component {
  render() {
    const estaAtivo = true;
    const styles = {
      backgroundColor: estaAtivo ? "green" : "red",
    };

    return <button className="botao">Botao</button>;
  }
}

export default Botao;
