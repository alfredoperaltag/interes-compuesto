import React, { Component } from 'react'

import Input from '../forms/inputs/input'

class ChartForm extends Component {
    state = {
        calendario: "2022-07-10",
        total: 8369,
        porcentaje: 6,
        ingresoExtraMensual: 1874,
        cantidadConsultar: 50
    }

    handleInputChange = (event) => {
        const target = event.target
        const id = target.id
        this.setState({
            [id]: target.value
        })
        //this.props.inversion(this.state)
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.props.inversion(this.state)
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <div className="row">
                    <div className="col">
                        <h1>Interes Compuesto</h1>
                    </div>
                </div>
                <div className="row justify-content-center">
                    <div className="col-sm-12 col-md-3">
                        <Input type="date" id="calendario" value={this.state.calendario} onChange={this.handleInputChange}>Fecha limite: </Input>
                        <Input type="number" min="0" id="total" value={this.state.total} onChange={this.handleInputChange}>Total: </Input>
                    </div>
                    <div className="col-sm-12 col-md-3">
                        <Input type="number" min="0" id="porcentaje" value={this.state.porcentaje} onChange={this.handleInputChange}>Porcentaje: </Input>
                        <Input type="number" min="0" id="ingresoExtraMensual" value={this.state.ingresoExtraMensual} onChange={this.handleInputChange}>Ingreso extra mensual: </Input>
                    </div>
                    <div className="col-sm-12 col-md-3">
                        <Input type="number" min="0" id="cantidadConsultar" value={this.state.cantidadConsultar} onChange={this.handleInputChange}>Cantidad a consultar: </Input>
                        <button type="submit" className="col-sm-3 col-md-5 btn btn-primary float-left mt-4">Aceptar</button>
                    </div>
                </div>
            </form>
        )
    }
}

export default ChartForm