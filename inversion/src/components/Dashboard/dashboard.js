import React from 'react'
import Charts from '../chart/chart'
import moment from 'moment'
import ChartForm from '../chartForm/chartForm'

class Dashboard extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            datos: [],
            meses: [],
            inicial: [],
            ingresoExtraMes: [],
            labelCantidadConsultada: "",
            labelGenerarCentavo: "",
            cantidadConsultar: ""
        }
    }

    inversion = formState => {
        let calendario = moment(formState.calendario)
        let days = calendario.diff(moment(), 'days')
        let total = parseInt(formState.total)
        let porcentaje = parseInt(formState.porcentaje)
        let ingresoExtraMensual = parseInt(formState.ingresoExtraMensual)
        let cantidadAConsultarPesos = parseInt(formState.cantidadConsultar)
        let dineroInicial = total
        let gananciaDia = 0
        let gananciasTotales = 0
        let diaDelMes = 1
        let diasGenerarCentavo = 0
        let diasGenerarCantidad = 0
        let gananciaActual = 0
        let numeroMes = 0
        let datos = []
        let meses = []
        let inicial = []
        let ingresoExtraMes = []
        let dineroTotal = total
        //let resultado = []

        for (let index = 0; index <= days; index++) {
            gananciaDia = (((total * porcentaje) / 100) / 365)
            if (index === 0) {
                gananciaActual = gananciaDia
            }
            if (index !== 0) {
                total = total + gananciaDia
            }
            gananciasTotales += gananciaDia
            if (diaDelMes === 30) {
                total += ingresoExtraMensual
                //resultado.push({ total, gananciaDia, porcentaje, gananciasTotales, ingresoExtraMensual })
                numeroMes++
                datos.push(total)
                inicial.push(dineroInicial)
                meses.push("mes " + numeroMes)
                dineroTotal += ingresoExtraMensual
                ingresoExtraMes.push(dineroTotal)
                diaDelMes = 0
            } else {
                diaDelMes++
            }
            if (gananciaDia.toFixed(1) > gananciaActual.toFixed(1) && diasGenerarCentavo === 0) {
                diasGenerarCentavo = index
            }
            if (gananciasTotales >= cantidadAConsultarPesos && diasGenerarCantidad === 0) {
                diasGenerarCantidad = index
            }
        }
        this.setState({
            datos,
            inicial,
            meses,
            ingresoExtraMes,
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
                datos={this.state.datos}
                meses={this.state.meses}
                inicial={this.state.inicial}
                ingresoExtraMensual={this.state.ingresoExtraMes}
            />
        </div>
    }
}

export default Dashboard