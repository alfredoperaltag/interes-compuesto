import React from 'react'
import Charts from '../chart/chart'
import moment from 'moment'
import ChartForm from '../chartForm/chartForm'

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

    inversion = formState => {
        let calendario = moment(formState.calendario)
        let days = calendario.diff(moment(), 'days')
        let dineroInicial = parseInt(formState.dineroInicial)
        let porcentaje = parseInt(formState.porcentaje)
        let ingresoExtraMensual = parseInt(formState.ingresoExtraMensual)
        let cantidadConsultar = parseInt(formState.cantidadConsultar)
        let dineroInicialInput = dineroInicial
        let dineroTotal = dineroInicial
        let gananciaDia = 0
        let gananciaActual = 0
        let gananciasTotales = 0
        let diasGenerarCentavo = 0
        let diasGenerarCantidad = 0
        let diaDelMes = 1
        let numeroMes = 0
        let meses = []
        let dinerosIniciales = []
        let ingresosExtrasMensuales = []
        let interesesCompuestos = []

        //let resultado = []

        for (let day = 0; day <= days; day++) {
            gananciaDia = (((dineroInicial * porcentaje) / 100) / 365)
            if (day === 0) {
                gananciaActual = gananciaDia

                meses.push("Inicial")
                dinerosIniciales.push(dineroInicialInput)
                ingresosExtrasMensuales.push(dineroTotal)
                interesesCompuestos.push(dineroInicial)
            } else {
                //if (day !== 0) {
                dineroInicial += gananciaDia
            }
            gananciasTotales += gananciaDia
            if (gananciaDia.toFixed(1) > gananciaActual.toFixed(1) && diasGenerarCentavo === 0) {
                diasGenerarCentavo = day
            }
            if (gananciasTotales >= cantidadConsultar && diasGenerarCantidad === 0) {
                diasGenerarCantidad = day
            }

            if (diaDelMes === 30) {
                //resultado.push({ dineroInicial, gananciaDia, porcentaje, gananciasTotales, ingresoExtraMensual })
                numeroMes++
                meses.push("Mes " + numeroMes)
                dinerosIniciales.push(dineroInicialInput)
                dineroTotal += ingresoExtraMensual
                ingresosExtrasMensuales.push(dineroTotal)
                dineroInicial += ingresoExtraMensual
                interesesCompuestos.push(dineroInicial)
                diaDelMes = 0
            } else {
                diaDelMes++
            }

        }
        this.setState({
            interesesCompuestos,
            dinerosIniciales,
            meses,
            ingresosExtrasMensuales,
            labelGenerarCentavo: diasGenerarCentavo,
            labelCantidadConsultada: diasGenerarCantidad,
            cantidadConsultar: formState.cantidadConsultar
        })
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
        </div>
    }
}

export default Dashboard