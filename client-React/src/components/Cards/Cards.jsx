import React, { Component } from "react";
import Card from "../Cards/Card"

class Cards extends Component {

    render() {
        return <div className="row justify-content-center">
            <Card class={"secondary"} titulo={"Porcentaje"} porcentaje={this.props.porcentajePromedio} />
            <Card class={"primary"} titulo={"Ganancia"} porcentaje={this.props.gananciaPromedio} />
            <Card class={"white text-dark"} titulo={"Ganancia diaria"} porcentaje={this.props.gananciaDiaPromedio} />
        </div>
    }
}

export default Cards