import React from 'react'
import Charts from '../chart/chart'
import ChartForm from '../chartForm/chartForm'
import DashboardReal from '../Dashboard/DashboardReal'

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
        await fetch('http://localhost:5000', {
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
                    labelGenerarCentavo: response.diasGenerarCentavo,
                    labelCantidadConsultada: response.diasGenerarCantidad,
                    cantidadConsultar: response.cantidadConsultar
                })
            });
    }

    render() {
        return <div>
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
            <DashboardReal />
        </div>
    }
}

export default Dashboard