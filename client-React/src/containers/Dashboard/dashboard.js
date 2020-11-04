import React from 'react'
import Charts from '../../components/chart/chart'
import ChartForm from '../../containers/chartForm/chartForm'
import Auxiliar from '../../Auxiliar/Auxiliar'
import services from '../../services/services'

import moment from 'moment'

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

    post = async data => {
        //await fetch('http://localhost:5000', {
        await services('https://localhost:44381/api/inversion', 'POST', data)
            .then(res => res.json())
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

    submit = async formState => {
        let calendario = moment(formState.calendario)
        let days = calendario.diff(moment(), 'days')
        let data = {
            days,
            dineroInicial: parseFloat(formState.dineroInicial),
            porcentaje: parseFloat(formState.porcentaje),
            ingresoExtraMensual: parseFloat(formState.ingresoExtraMensual),
            cantidadConsultar: parseInt(formState.cantidadConsultar)
        }
        const notNumber = (number) => {
            if (isNaN(number)) {
                return number = 0
            }
            return number
        }
        data.dineroInicial = await notNumber(data.dineroInicial)
        data.porcentaje = await notNumber(data.porcentaje)
        data.ingresoExtraMensual = await notNumber(data.ingresoExtraMensual)
        data.cantidadConsultar = await notNumber(data.cantidadConsultar)
        this.post(data)
    }

    render() {
        return <Auxiliar>
            <ChartForm submit={this.submit} />
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