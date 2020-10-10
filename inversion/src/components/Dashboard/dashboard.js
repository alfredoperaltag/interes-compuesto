import React from 'react'
import Charts from '../chart/chart'
import moment from 'moment'
import ChartForm from '../chartForm/chartForm'
import ChartFormPropio from '../chartFormPropio/ChartFormPropio'

import data from '../../sample/data.json'

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
            cantidadConsultar: "",
            data: data
        }
    }

    inversion = formState => {
        let calendario = moment(formState.calendario)
        let days = calendario.diff(moment(), 'days')
        let dineroInicial = parseFloat(formState.dineroInicial)
        let porcentaje = parseFloat(formState.porcentaje)
        let ingresoExtraMensual = parseFloat(formState.ingresoExtraMensual)
        let cantidadConsultar = parseFloat(formState.cantidadConsultar)
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
                dinerosIniciales.push(dineroInicialInput.toFixed(2))
                ingresosExtrasMensuales.push(dineroTotal.toFixed(2))
                interesesCompuestos.push(dineroInicial.toFixed(2))
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
                dinerosIniciales.push(dineroInicialInput.toFixed(2))
                dineroTotal += ingresoExtraMensual
                ingresosExtrasMensuales.push(dineroTotal.toFixed(2))
                dineroInicial += ingresoExtraMensual
                interesesCompuestos.push(dineroInicial.toFixed(2))
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

    getDataChart = formState => {
        this.setState({
            data: {
                meses:
                    [...this.state.data.meses, this.state.data.meses.length],
                ingresosExtrasMensuales: [...this.state.data.ingresosExtrasMensuales, formState.dineroTotal],
                interesesCompuestos: [...this.state.data.interesesCompuestos, formState.dineroTotalIntereses]
            }
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
            <h2>Datos Propios Reales</h2>
            <ChartFormPropio getDataChart={this.getDataChart} />
            <Charts
                meses={this.state.data.meses}
                ingresosExtrasMensuales={this.state.data.ingresosExtrasMensuales}
                interesesCompuestos={this.state.data.interesesCompuestos}
            />
        </div>
    }
}

export default Dashboard