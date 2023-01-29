import React from "react";

import style from "./style.module.scss";
import Botao from "../../../shared/button";

class Formulario extends React.Component {
  render() {
    return (
      <form className={style.novaTarefa}>
        <div className={style.inputContainer}>
          <label className="" htmlFor="tarefa">
            Adicione um novo estudo
          </label>
          <input type="text" name="tarefa" id="tarefa" placeholder="O que você quer estudar?" required />
        </div>
        <div className={style.inputContainer}>
          <label htmlFor="tempo">Tempo</label>
          <input type="time" step="1" name="tempo" id="tempo" min="00:00:00" max="01:30:00" required />
        </div>
        <Botao />
      </form>
    );
  }
}

export default Formulario;
