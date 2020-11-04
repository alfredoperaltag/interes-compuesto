import React, { Component } from 'react'

import ChartFormPropio from '../../containers/chartFormPropio/ChartFormPropio'
import Charts from '../../components/chart/chart'
import Table from '../../components/Table/Table'
import Auxiliar from '../../Auxiliar/Auxiliar'
import services from '../../services/services'

//import data from '../../sample/data.json'

class DashboardReal extends Component {
    state = {
        data: [],
        dataChart: {},
        showChartFormPropio: false,
        showTable: true,
        element: null,
        showInputMes: true
    }

    url = 'https://localhost:44381/api/inversionPropiaItems/'

    get = async () => {
        let meses = [], ingresosExtrasMensuales = [], interesesCompuestos = []
        await fetch(this.url, {
        }).then(res => res.json())
            .catch(error => console.error('Error:', error))
            .then(response => {
                response.forEach(element => {
                    meses.push(element.meses)
                    ingresosExtrasMensuales.push(element.ingresosExtrasMensuales)
                    interesesCompuestos.push(element.interesesCompuestos)
                });
                this.setState({
                    data: response,
                    dataChart: {
                        meses,
                        ingresosExtrasMensuales,
                        interesesCompuestos
                    }
                })
                if (!this.state.data[0]) {
                    this.setState({
                        showInputMes: false
                    })
                } else {
                    this.setState({
                        showInputMes: true
                    })
                }
            });
    }

    post = async dataChart => {
        await services(this.url, 'POST', dataChart)
            .then()
            .catch(error => console.error('Error:', error))
            .then(response => {
                this.get()
                this.toogle()
            });
    }

    put = async dataChart => {
        await services(this.url + this.state.element.id, 'PUT', dataChart)
            .then()
            .catch(error => console.error('Error:', error))
            .then(response => {
                this.get()
                this.toogle()
                this.elementNull()
            });
    }

    delete = async (id) => {
        await fetch(this.url + id, {
            method: 'DELETE', // or 'PUT'
        }).then(res => res.json())
            .catch(error => console.error('Error:', error))
            .then(response => {
                this.get()
            });
    }

    submit = async formState => {
        let meses = formState.meses === "0" ? "Inicial" : "Mes " + formState.meses
        let dataChart = {
            id: this.state.element ? this.state.element.id : undefined,
            meses: meses,
            ingresosExtrasMensuales: parseFloat(formState.dineroTotal),
            interesesCompuestos: parseFloat(formState.dineroTotalIntereses)
        }
        if (this.state.element) {
            console.log("put", dataChart);
            await this.put(dataChart)
        } else {
            console.log("post", dataChart);
            await this.post(dataChart)
        }
    }

    async componentDidMount() {
        await this.get()
    }

    edit = element => {
        this.toogle()
        this.setState({
            element: element
        })
    }

    cancel = () => {
        this.toogle()
        this.elementNull()
    }

    toogle = () => {
        this.setState({
            showChartFormPropio: !this.state.showChartFormPropio,
            showTable: !this.state.showTable
        })
    }

    elementNull = () => this.setState({
        element: null
    })

    render() {
        const chartFormPropio = this.state.showChartFormPropio ?
            <ChartFormPropio
                submit={this.submit}
                cancel={this.cancel}
                element={this.state.element}
                showInputMes={this.state.showInputMes}
            /> :
            <button
                className="btn btn-primary"
                onClick={this.toogle}>
                Agregar Mes
            </button>
        const table = this.state.showTable ? <Table
            data={this.state.data}
            edit={this.edit}
            delete={this.delete}
        /> : null
        return (<Auxiliar>
            <h2>Datos Propios Reales</h2>
            <Charts
                meses={this.state.dataChart.meses}
                ingresosExtrasMensuales={this.state.dataChart.ingresosExtrasMensuales}
                interesesCompuestos={this.state.dataChart.interesesCompuestos}
            />
            {chartFormPropio}
            {table}
        </Auxiliar>)
    }
}

export default DashboardReal