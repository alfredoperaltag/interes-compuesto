import React, { Component } from 'react'

import Form from '../Form/Form'
import Input from '../chartForm/inputs/input'

class ChartFormPropio extends Component {
    state = {
        dineroTotal: 9000,
        dineroTotalIntereses: 9100,
    }

    handleInputChange = async (event) => {
        const target = event.target
        const id = target.id
        await this.setState({
            [id]: parseInt(target.value)
        })
    }

    render() {
        return (
            <Form method={() => this.props.getDataChart(this.state)} title="Interes Compuesto Propio">
                <div className="col-sm-12 col-md-3">
                    <Input type="number" min="0" step="0.001" id="dineroTotal" value={this.state.dineroTotal} onChange={this.handleInputChange}>Dinero Total: </Input>
                </div>
                <div className="col-sm-12 col-md-3">
                    <Input type="number" min="0" step="0.001" id="dineroTotalIntereses" value={this.state.dineroTotalIntereses} onChange={this.handleInputChange}>Dinero Total con Intereses: </Input>
                </div>
                <div className="col-sm-12 col-md-3">
                    <button type="submit" className="col-sm-3 col-md-5 btn btn-primary float-left mt-4">Aceptar</button>
                </div>
            </Form>
        )
    }
}

export default ChartFormPropio