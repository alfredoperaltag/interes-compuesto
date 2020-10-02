import React from 'react'
import Input from './inputs/input'
import Charts from '../charts/charts'
import moment from 'moment'

class Form extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      dateStart: moment(),
      calendario: "2022-07-10",
      total: 8369,
      porcentaje: 6,
      ingresoExtraMensual: 1874,
      cantidadConsultar: 50,
      datos: [],
      meses: [],
      inicial: [],
      ingresoExtraMes: [],
      labelCantidadConsultada: "",
      labelGenerarCentavo: "",
    }
  }

  handleInputChange = async (event) => {
    const target = event.target
    const id = target.id
    await this.setState({
      [id]: target.value
    })
    this.inversion()
  }

  handleSubmit = async (event) => {
    await event.preventDefault();
    this.inversion()
  }

  inversion = () => {
    let calendario = moment(this.state.calendario)
    let days = calendario.diff(this.state.dateStart, 'days')
    let total = parseInt(this.state.total)
    let porcentaje = parseInt(this.state.porcentaje)
    let ingresoExtraMensual = parseInt(this.state.ingresoExtraMensual)
    let cantidadAConsultarPesos = parseInt(this.state.cantidadConsultar)
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
      labelCantidadConsultada: diasGenerarCantidad
    })
  }

  render() {


    return <form onSubmit={this.handleSubmit}>
      <div className="row">
        <div className="col">
          <h1>Interes Compuesto</h1>
        </div>
      </div>
      <div className="row justify-content-center">
        <div className="col-sm-12 col-md-3">
          <Input type="date" id="calendario" value={this.state.calendario} onChange={this.handleInputChange}>Fecha limite: </Input>
          <Input type="number" min="0" id="total" value={this.state.total} onChange={this.handleInputChange}>Total: </Input>
        </div>
        <div className="col-sm-12 col-md-3">
          <Input type="number" min="0" id="porcentaje" value={this.state.porcentaje} onChange={this.handleInputChange}>Porcentaje: </Input>
          <Input type="number" min="0" id="ingresoExtraMensual" value={this.state.ingresoExtraMensual} onChange={this.handleInputChange}>Ingreso extra mensual: </Input>
        </div>
        <div className="col-sm-12 col-md-3">
          <Input type="number" min="0" id="cantidadConsultar" value={this.state.cantidadConsultar} onChange={this.handleInputChange}>Cantidad a consultar: </Input>
          <button type="submit" className="col-sm-3 col-md-5 btn btn-primary float-left mt-4">Aceptar</button>
        </div>
      </div>
      <div>
        <div className="row justify-content-center">
          <div className="col-md-3">
            <h6>Dias(Meses) para generar {this.state.cantidadConsultar} pesos: <strong>{this.state.labelCantidadConsultada}</strong></h6>
          </div>
          <div className="col-md-3">
            <h6>Dias para generar un centavo extra de ganancia: <strong>{this.state.labelGenerarCentavo}</strong></h6>
          </div>
        </div>
        <Charts datos={this.state.datos} meses={this.state.meses} inicial={this.state.inicial} ingresoExtraMensual={this.state.ingresoExtraMes} />
      </div>
    </form>
  }
}

export default Form