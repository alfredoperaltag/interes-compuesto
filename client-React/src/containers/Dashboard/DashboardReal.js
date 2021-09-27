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
            data: [],
            dataChart: {
                meses: [],
                ingresosExtrasMensuales: [],
                interesesCompuestos: []
            }
        }
    }

    url = 'http://localhost:3000/api/registros/'
    idCentral = "6136e4ee3874300d8ceab12f"

    get = async url => {
        let meses = [], ingresosExtrasMensuales = [], interesesCompuestos = []
        await fetch(this.url + url, {
        }).then(res => res.json())
            .catch(error => console.error('Error:', error))
            .then(res => {
                res.forEach(element => {
                    meses.push(element.mes)
                    ingresosExtrasMensuales.push(element.ingreso_actual)
                    interesesCompuestos.push(element.total)
                });
                this.setState({
                    registros: {
                        data: res,
                        dataChart: {
                            meses,
                            ingresosExtrasMensuales,
                            interesesCompuestos
                        }
                    }
                })
            });
    }

    async componentDidMount() {
        await this.get(this.idCentral)
        await new servicesInstrumentos().get()
            .then(instrumentos => this.setState({ instrumentos }))
            .catch(error => console.error('Error:', error))
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