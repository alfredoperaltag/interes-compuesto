import React, { Component } from 'react'

import Form from '../Form/Form'
import Input from './inputs/input'

class ChartForm extends Component {
    state = {
        calendario: "2022-07-10",
        dineroInicial: 7114.55,
        porcentaje: 10.49,
        ingresoExtraMensual: 1874,
        cantidadConsultar: 50
    }

    handleInputChange = async (event) => {
        const target = event.target
        const id = target.id
        await this.setState({
            [id]: target.value
        })
        this.props.inversion(this.state)
    }

    render() {
        return (
            <Form method={() => this.props.inversion(this.state)} title="Interes Compuesto">
                <div className="col-sm-12 col-md-3">
                    <Input type="date" id="calendario" value={this.state.calendario} onChange={this.handleInputChange}>Fecha limite: </Input>
                    <Input type="number" min="0" step="0.001" id="dineroInicial" value={this.state.dineroInicial} onChange={this.handleInputChange}>Dinero Inicial: </Input>
                </div>
                <div className="col-sm-12 col-md-3">
                    <Input type="number" min="0" step="0.001" id="porcentaje" value={this.state.porcentaje} onChange={this.handleInputChange}>Porcentaje: </Input>
                    <Input type="number" min="0" step="0.001" id="ingresoExtraMensual" value={this.state.ingresoExtraMensual} onChange={this.handleInputChange}>Ingreso extra mensual: </Input>
                </div>
                <div className="col-sm-12 col-md-3">
                    <Input type="number" min="0" step="0.001" id="cantidadConsultar" value={this.state.cantidadConsultar} onChange={this.handleInputChange}>Cantidad a consultar: </Input>
                    <button type="submit" className="col-sm-3 col-md-5 btn btn-primary float-left mt-4">Aceptar</button>
                </div>
            </Form>
        )
    }
}

export default ChartForm