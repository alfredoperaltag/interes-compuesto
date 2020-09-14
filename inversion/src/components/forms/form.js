import React from 'react'
import Input from './inputs/input'
import Charts from '../charts/charts'
import moment from 'moment'

class Form extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      dateStart: moment(),
      calendario: moment("2022-07-10"),
      total: 7369,
      porcentaje: 6,
      ingresoExtraMensual: 1874,
      cantidadConsultar: 50,
      datos: [],
      meses: [],
      inicial: [],
      ingresoExtraMes: [],
      labelCantidadConsultada: "",
      labelGenerarCentavo: ""
    }

    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleInputChange(event) {
    const target = event.target
    const id = target.id
    this.setState({
      [id]: parseInt(target.value)
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.inversion()
  }

  inversion = () => {
    let days = this.state.calendario.diff(this.state.dateStart, 'days')
    let total = this.state.total
    let porcentaje = this.state.porcentaje
    let ingresoExtraMensual = this.state.ingresoExtraMensual
    let cantidadAConsultarPesos = this.state.cantidadConsultar
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
        meses.push(numeroMes)
        dineroTotal += ingresoExtraMensual
        ingresoExtraMes.push(dineroTotal)
        this.setState({
          datos,
          inicial,
          meses,
          ingresoExtraMes
        })
        diaDelMes = 0
      } else {
        diaDelMes++
      }
      if (gananciaDia.toFixed(1) > gananciaActual.toFixed(1) && diasGenerarCentavo === 0) {
        diasGenerarCentavo = index
        this.setState({ labelGenerarCentavo: diasGenerarCentavo })
      }
      if (gananciasTotales >= cantidadAConsultarPesos && diasGenerarCantidad === 0) {
        diasGenerarCantidad = index
        this.setState({ labelCantidadConsultada: diasGenerarCantidad })
      }
    }
  }

  render() {
    return <form onSubmit={this.handleSubmit}>
      <Input type="date" id="calendario" value={this.state.calendario} onChange={this.handleInputChange}>Fecha limite: </Input>
      <Input type="number" min="0" id="total" value={this.state.total} onChange={this.handleInputChange}>Total: </Input>
      <Input type="number" min="0" id="porcentaje" value={this.state.porcentaje} onChange={this.handleInputChange}>Porcentaje: </Input>
      <Input type="number" min="0" id="ingresoExtraMensual" value={this.state.ingresoExtraMensual} onChange={this.handleInputChange}>Ingreso extra mensual: </Input>
      <Input type="number" min="0" id="cantidadConsultar" value={this.state.cantidadConsultar} onChange={this.handleInputChange}>Cantidad a consultar: </Input>
      <button type="submit" className="btn btn-primary">Aceptar</button>
      <p>Dias(Meses) para generar {this.state.cantidadConsultar} pesos: {this.state.labelCantidadConsultada}</p>
      <p>Dias para generar un centavo: {this.state.labelGenerarCentavo}</p>
      <Charts datos={this.state.datos} meses={this.state.meses} inicial={this.state.inicial} ingresoExtraMensual={this.state.ingresoExtraMes} />
    </form>
  }
}

export default Form