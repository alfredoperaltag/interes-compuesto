import React from 'react'
import Charts from '../chart/chart'
import ChartForm from '../chartForm/chartForm'
import Auxiliar from '../../Auxiliar/Auxiliar'

class Dashboard extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            meses: [],
            dinerosIniciales: [],
            ingresosExtrasMensuales: [],
            interesesCompuestos: [],
            labelCantidadConsultada: "",
            labelGenerarCentavo: "",
            cantidadConsultar: ""
        }
    }

    inversion = async formState => {
        //await fetch('http://localhost:5000', {
        await fetch('https://localhost:44381/api/inversion', {
            method: 'POST', // or 'PUT'
            body: JSON.stringify(formState), // data can be `string` or {object}!
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
            .catch(error => console.error('Error:', error))
            .then(response => {
                this.setState({
                    interesesCompuestos: response.interesesCompuestos,
                    dinerosIniciales: response.dinerosIniciales,
                    meses: response.meses,
                    ingresosExtrasMensuales: response.ingresosExtrasMensuales,
                    labelGenerarCentavo: response.labelGenerarCentavo,
                    labelCantidadConsultada: response.labelCantidadConsultada,
                    cantidadConsultar: response.cantidadConsultar
                })
            });
    }

    render() {
        return <Auxiliar>
            <ChartForm inversion={this.inversion} />
            <div className="row justify-content-center">
                <div className="col-md-3">
                    <h6>Dias(Meses) para generar {this.state.cantidadConsultar} pesos: <strong>{this.state.labelCantidadConsultada}</strong></h6>
                </div>
                <div className="col-md-3">
                    <h6>Dias para generar un centavo extra de ganancia: <strong>{this.state.labelGenerarCentavo}</strong></h6>
                </div>
            </div>
            <Charts
                interesesCompuestos={this.state.interesesCompuestos}
                meses={this.state.meses}
                dinerosIniciales={this.state.dinerosIniciales}
                ingresosExtrasMensuales={this.state.ingresosExtrasMensuales}
            />
        </Auxiliar>
    }
}

export default Dashboard