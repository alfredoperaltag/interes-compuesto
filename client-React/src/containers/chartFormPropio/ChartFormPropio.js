import React, { Component } from 'react'

import Form from '../../components/Form/Form'
import Input from '../../components/Form/inputs/input'

class ChartFormPropio extends Component {
    componentDidMount() {
        if (this.props.element) {
            if (this.props.element.meses === "Inicial") {
                this.setState({
                    meses: "0"
                })
            } else {
                this.setState({
                    meses: this.props.element.meses.slice(4)
                })
            }
        }
    }

    state = {
        dineroTotal: this.props.element ? this.props.element.ingresosExtrasMensuales : "",
        dineroTotalIntereses: this.props.element ? this.props.element.interesesCompuestos : "",
        meses: this.props.element ? this.props.element.meses : ""
    }

    handleInputChange = async (event) => {
        const target = event.target
        const id = target.id
        await this.setState({
            [id]: target.value
        })
    }

    render() {
        let className = "col-sm-3 col-md-5 float-left mt-4 btn "
        className = this.props.element ? className += "btn-warning" : className += "btn-primary"
        const children = this.props.element ? "Editar" : "Agregar"

        let numero = this.props.showInputMes ? <div className="col-sm-12 col-md-2">
            <Input type="number" min="0" id="meses" value={this.state.meses} onChange={this.handleInputChange}>Mes: </Input>
        </div> : null
        return (
            <Form submit={() => this.props.submit(this.state)} title="Interes Compuesto Propio">
                {numero}
                <div className="col-sm-12 col-md-2">
                    <Input type="number" min="0" step="0.001" id="dineroTotal" value={this.state.dineroTotal} onChange={this.handleInputChange}>Dinero Total: </Input>
                </div>
                <div className="col-sm-12 col-md-2">
                    <Input type="number" min="0" step="0.001" id="dineroTotalIntereses" value={this.state.dineroTotalIntereses} onChange={this.handleInputChange}>Dinero Total con Intereses: </Input>
                </div>
                <div className="col-sm-12 col-md-2">
                    <button
                        type="submit"
                        className={className}>
                        {children}
                    </button>
                </div>
                <div className="col-sm-12 col-md-2">
                    <button onClick={this.props.cancel} className="col-sm-3 col-md-5 btn btn-danger float-left mt-4">Cancelar</button>
                </div>
            </Form>
        )
    }
}

export default ChartFormPropio