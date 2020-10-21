import React, { Component } from 'react'

import Form from '../Form/Form'
import Input from '../chartForm/inputs/input'

class ChartFormPropio extends Component {
    state = {
        dineroTotal: this.props.element ? this.props.element.ingresosExtrasMensuales : "",
        dineroTotalIntereses: this.props.element ? this.props.element.interesesCompuestos : ""
    }

    handleInputChange = async (event) => {
        const target = event.target
        const id = target.id
        await this.setState({
            [id]: target.value
        })
    }

    render() {
        let botonAceptar = this.props.element ? <button type="submit" className="col-sm-3 col-md-5 btn btn-warning float-left mt-4">Editar</button> : <button type="submit" className="col-sm-3 col-md-5 btn btn-primary float-left mt-4">Agregar</button>
        return (
            <Form method={() => this.props.getDataChart(this.state)} title="Interes Compuesto Propio">
                <div className="col-sm-12 col-md-3">
                    <Input type="number" min="0" step="0.001" id="dineroTotal" value={this.state.dineroTotal} onChange={this.handleInputChange}>Dinero Total: </Input>
                </div>
                <div className="col-sm-12 col-md-3">
                    <Input type="number" min="0" step="0.001" id="dineroTotalIntereses" value={this.state.dineroTotalIntereses} onChange={this.handleInputChange}>Dinero Total con Intereses: </Input>
                </div>
                <div className="col-sm-12 col-md-3">
                    {botonAceptar}
                </div>
                <div className="col-sm-12 col-md-3">
                    <button onClick={this.props.toogleForm} className="col-sm-3 col-md-5 btn btn-danger float-left mt-4">Cancelar</button>
                </div>
            </Form>
        )
    }
}

export default ChartFormPropio