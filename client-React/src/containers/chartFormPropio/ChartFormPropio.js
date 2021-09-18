import React, { Component } from 'react'

import Form from '../../components/Form/Form'
import Input from '../../components/Form/inputs/input'
import InputsRegistro from './InputsRegistro'

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
        ingreso_actual: this.props.element ? this.props.element.ingresosExtrasMensuales : "",
        total: this.props.element ? this.props.element.interesesCompuestos : "",
        meses: this.props.element ? this.props.element.meses : "",
        registros: this.props.registros
    }

    handleInputChange = async (event) => {
        const target = event.target
        const id = target.id
        this.setState({
            [id]: target.value
        })
    }

    render() {
        let className = "m-2 btn "
        className = this.props.element ? className += "btn-warning" : className += "btn-primary"
        const children = this.props.element ? "Editar" : "Agregar"

        let numero = this.props.showInputMes ? <div className="col-sm-12 col-md-6">
            <Input type="number" min="0" id="meses" value={this.state.meses} onChange={this.handleInputChange}>Mes: </Input>
        </div> : null
        return (
            <Form submit={() => this.props.submit(this.state)} title="Interes Compuesto Propio">
                <div className="container card">
                    <div className="card-body">
                        {numero}
                        <InputsRegistro registros={this.state.registros} onChange={this.handleInputChange} />
                        <div className="row justify-content-center">
                            <div className="col-sm-12 col-md-3">
                                <button
                                    type="submit"
                                    className={className}>
                                    {children}
                                </button>
                                <button
                                    onClick={this.props.cancel}
                                    className="btn btn-danger m-2">
                                    Cancelar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </Form>
        )
    }
}

export default ChartFormPropio