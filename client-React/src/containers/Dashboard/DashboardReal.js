import React, { Component } from 'react'

import ChartFormPropio from '../../containers/chartFormPropio/ChartFormPropio'
import Auxiliar from '../../Auxiliar/Auxiliar'
import servicesInstrumentos from '../../services/servicesInstrumentos'
import TableInstrumentos from '../TableInstrumentos/TableInstrumentos'

import DashboardRendimientos from './dashboardRendimientos'

class DashboardReal extends Component {
    state = {
        showChartFormPropio: false,
        showDashboardRendimientos: true,
        showTableInstrumentos: false,
        instrumentos: [],
        registros: {
            data: []
        },
        idUltimoMes: null,
        dataAInvertir: [],
        lineChart: this.crearObjetoChart(
            "Rendimientos",
            "line",
            [],
            [{
                label: "Interes Compuesto",
                data: [],
                borderColor: 'green',
                backgroundColor: 'rgba(255,255,255,0)',
                borderWidth: 2,
                lineTension: 0
            },
            {
                label: "Ingreso Extra Mensual",
                data: [],
                borderColor: 'blue',
                backgroundColor: 'rgba(255,255,255,0)',
                borderWidth: 2,
                lineTension: 0
            }],
            {
                tooltips: {
                    mode: 'x'
                }
            }),
        pieChart: this.crearObjetoChart(
            "Portafolio",
            "pie",
            [],
            [{
                data: [],
                backgroundColor: [],
                hoverOffset: 4
            }]),
        doughnutChart: this.crearObjetoChart(
            "Modelo de Swensen",
            "doughnut",
            ["VOO", "VEA", "VWO", "VNQ", "VGIT/CETES", "UDIS"],
            [{
                data: [30, 15, 5, 20, 15, 15],
                backgroundColor: [
                    '#000000',
                    '#FFCD56',
                    '#FCD0B4',
                    '#FF0000',
                    '#599DCA',
                    '#599DCA',
                    '#0055CB'
                ],
                hoverOffset: 4
            }])
    }
    crearObjetoChart(titulo, type, labels, datasets, options) {
        return {
            titulo, type, labels, datasets, options
        }
    }

    url = 'http://localhost:3000/api/registros/'
    idCentral = "6136e4ee3874300d8ceab12f"

    getPorMes = async url => {
        let data = [], instrumentos = [], colores = []
        await fetch(this.url + "mes/" + url, {
        }).then(res => res.json())
            .catch(error => console.error('Error:', error))
            .then(res => {
                const dataAInvertir = []
                res.forEach(registro => {
                    if (registro.instrumento !== this.idCentral) {
                        this.state.instrumentos.forEach(instrumento => {
                            if (instrumento._id === registro.instrumento) {
                                instrumentos.push(instrumento.nombre)
                                colores.push(instrumento.color)
                                if (instrumento.porcentaje > 0) {
                                    dataAInvertir.push({
                                        nombre: instrumento.nombre,
                                        dineroAInvertir: registro.cantidadAInvertir?registro.cantidadAInvertir:0//todos los registros deben tener cantidadAInvertir para corregir esta linea
                                    })
                                }
                            }
                        });
                        data.push(registro.portafolio)
                    }
                });
                this.setState({
                    dataAInvertir,
                    pieChart: {
                        ...this.state.pieChart,
                        labels: instrumentos,
                        /*datasets: [{
                            data,
                            backgroundColor: colores
                        }],*/
                        datasets: [
                            {
                                ...this.state.pieChart.datasets[0],
                                data,
                                backgroundColor: colores
                            }
                        ]
                    }
                })
            });
    }

    get = async url => {
        let meses = [], ingresosExtrasMensuales = [], interesesCompuestos = []
        await fetch(this.url + "promedios/" + url, {
        }).then(res => res.json())
            .catch(error => console.error('Error:', error))
            .then(res => {
                res.registros.forEach(element => {
                    meses.push(element.mes)
                    ingresosExtrasMensuales.push(element.ingreso_actual)
                    interesesCompuestos.push(element.total)
                });
                this.setState({
                    registros: {
                        data: res.registros,
                        porcentajePromedio: res.porcentaje,
                        gananciaPromedio: res.ganancia,
                        gananciaDiaPromedio: res.gananciaDia
                    },
                    lineChart: {
                        ...this.state.lineChart,
                        labels: meses,
                        datasets: [
                            {
                                ...this.state.lineChart.datasets[0],
                                data: interesesCompuestos
                            },
                            {
                                ...this.state.lineChart.datasets[1],
                                data: ingresosExtrasMensuales
                            }
                        ]

                    },
                    idUltimoMes: res.registros[res.registros.length - 1]._id
                })
            });
    }

    async componentDidMount() {
        await this.get(this.idCentral)
        await new servicesInstrumentos().get()
            .then(instrumentos => this.setState({ instrumentos }))
            .catch(error => console.error('Error:', error))
        await this.getPorMes(this.state.idUltimoMes)
    }

    toogle = () => {
        this.setState({
            showChartFormPropio: !this.state.showChartFormPropio,
            showDashboardRendimientos: !this.state.showDashboardRendimientos,
        })
    }

    toogleInstrumentos = () => {
        console.log("epa2")
        this.setState({
            showDashboardRendimientos: false,
            showTableInstrumentos: true,
        })
    }

    toogleDashboard = () => {
        console.log("epa")
        this.setState({
            showDashboardRendimientos: true,
            showTableInstrumentos: false,
        })
    }

    render() {
        const dashboardRendimientos = this.state.showDashboardRendimientos ?
            <DashboardRendimientos
                url={this.url}
                idCentral={this.idCentral}
                get={this.get}
                toogle={this.toogle}
                toogleInstrumentos={this.toogleInstrumentos}
                instrumentos={this.state.instrumentos}
                registros={this.state.registros}
                lineChart={this.state.lineChart}
                pieChart={this.state.pieChart}
                doughnutChart={this.state.doughnutChart}
                dataAInvertir={this.state.dataAInvertir}
                idUltimoMes={this.state.idUltimoMes}
                getPorMes={this.getPorMes}
            /> : null
        const chartFormPropio = this.state.showChartFormPropio ?
            <ChartFormPropio
                url={this.url}
                idCentral={this.idCentral}
                get={this.get}
                toogle={this.toogle}
                instrumentos={this.state.instrumentos}
                idUltimoMes={this.state.idUltimoMes}
                getPorMes={this.getPorMes}
            /> : null
        const tableInstrumentos = this.state.showTableInstrumentos ?
            <TableInstrumentos
                url={this.url}
                idCentral={this.idCentral}
                get={this.get}
                toogle={this.toogle}
                toogleDashboard={this.toogleDashboard}
                instrumentos={this.state.instrumentos}
                idUltimoMes={this.state.idUltimoMes}
                getPorMes={this.getPorMes}
            /> : null

        return <Auxiliar>
            {dashboardRendimientos}
            {chartFormPropio}
            {tableInstrumentos}
        </Auxiliar>
    }
}

export default DashboardReal