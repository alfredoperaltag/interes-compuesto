import React, { Component } from 'react'

import Form from '../../components/Form/Form'
import Input from '../../components/Form/inputs/input'
import InputsRegistro from './InputsRegistro'
import services from '../../services/services'

class ChartFormPropio extends Component {
    state = {
        ingreso_actual:  "",
        total: "",
        meses: "",
        instrumentos: this.props.instrumentos,
        element: null
    }

    post = async dataChart => {

        await services(this.props.url + "/registro_central", 'POST', dataChart)
            .then()
            .catch(error => console.error('Error:', error))
            .then(response => {
                this.props.get(this.props.idCentral)
                this.props.toogle()
            });
    }

    submit = async formState => {
        const dataChart = {
            mes: formState.meses,
            registros: []
        }
        const registros = []
        formState.registros.forEach(registro => {
            let idInputDineroTotal = "dineroTotal" + registro._id
            let idInputDineroTotalIntereses = "dineroTotalIntereses" + registro._id
            registros[registro._id] = { instrumento: registro._id }

            for (const key in formState)
                if (key === idInputDineroTotal)
                    registros[registro._id].ingreso_actual = parseFloat(formState[key])
                else if (key === idInputDineroTotalIntereses)
                    registros[registro._id].total = parseFloat(formState[key])

            dataChart.registros.push(registros[registro._id])
        })
        if (this.state.element) {
            console.log("put", dataChart);
            //await this.put(dataChart)
        } else {
            console.log("post", dataChart);
            await this.post(dataChart)
        }
    }

    elementNull = () => this.setState({
        element: null
    })

    cancel = () => {
        this.props.toogle()
        this.elementNull()
    }

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

        let numero = <div className="col-sm-12 col-md-6">
            <Input type="number" min="0" id="meses" value={this.state.meses} onChange={this.handleInputChange}>Mes: </Input>
        </div>
        return (
            <Form submit={() => this.submit(this.state)} title="Interes Compuesto Propio">
                <div className="container card">
                    <div className="card-body">
                        {numero}
                        <InputsRegistro registros={this.state.instrumentos} onChange={this.handleInputChange} />
                        <div className="row justify-content-center">
                            <div className="col-sm-12 col-md-3">
                                <button
                                    type="submit"
                                    className={className}>
                                    {children}
                                </button>
                                <button
                                    onClick={this.cancel}
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