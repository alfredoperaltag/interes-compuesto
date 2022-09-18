import React, { Component } from 'react'

import ChartFormPropio from '../../containers/chartFormPropio/ChartFormPropio'
import Auxiliar from '../../Auxiliar/Auxiliar'
import servicesInstrumentos from '../../services/servicesInstrumentos'

import DashboardRendimientos from './dashboardRendimientos'

class DashboardReal extends Component {
    state = {
        showChartFormPropio: false,
        showDashboardRendimientos: true,
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
                const registroCentral = res.find(registro => registro.instrumento === this.idCentral)
                const dataAInvertir = []
                let vwoAgregago = false
                res.forEach(registro => {
                    if (registro.instrumento !== this.idCentral) {
                        this.state.instrumentos.forEach(instrumento => {
                            if (instrumento._id === registro.instrumento) {
                                instrumentos.push(instrumento.nombre)
                                colores.push(instrumento.color)
                                switch (registro.instrumento) {
                                    case "6139abfcc830aa20acf98e29":
                                        //dataAInvertir[instrumento.nombre] = registroCentral.total * 0.30 - registro.total
                                        dataAInvertir.push({
                                            nombre: instrumento.nombre,
                                            dineroAInvertir: registroCentral.total * 0.30 - registro.total
                                        })
                                        break;
                                    case "61542f5e6f48bd18f80b35c7":
                                        dataAInvertir.push({
                                            nombre: instrumento.nombre,
                                            dineroAInvertir: registroCentral.total * 0.30 - registro.total
                                        })
                                        break;
                                    case "61542f7b6f48bd18f80b35c8":
                                        dataAInvertir.push({
                                            nombre: instrumento.nombre,
                                            dineroAInvertir: registroCentral.total * 0.15 - registro.total
                                        })
                                        break;
                                    case "61542f846f48bd18f80b35c9":
                                        dataAInvertir.push({
                                            nombre: instrumento.nombre,
                                            dineroAInvertir: registroCentral.total * 0.20 - registro.total
                                        })
                                        break;
                                    default:
                                        if (!vwoAgregago)
                                            dataAInvertir.push({
                                                nombre: "VWO",
                                                dineroAInvertir: registroCentral.total * 0.05
                                            })
                                        vwoAgregago = true
                                        break
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

    render() {
        const dashboardRendimientos = this.state.showDashboardRendimientos ?
            <DashboardRendimientos
                url={this.url}
                idCentral={this.idCentral}
                get={this.get}
                toogle={this.toogle}
                instrumentos={this.state.instrumentos}
                registros={this.state.registros}
                lineChart={this.state.lineChart}
                pieChart={this.state.pieChart}
                doughnutChart={this.state.doughnutChart}
                dataAInvertir={this.state.dataAInvertir}
            /> : null
        const chartFormPropio = this.state.showChartFormPropio ?
            <ChartFormPropio
                url={this.url}
                idCentral={this.idCentral}
                get={this.get}
                toogle={this.toogle}
                instrumentos={this.state.instrumentos}
            /> : null

        return <Auxiliar>
            {dashboardRendimientos}
            {chartFormPropio}
        </Auxiliar>
    }
}

export default DashboardReal