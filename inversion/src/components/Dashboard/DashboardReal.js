import React, { Component } from 'react'

import ChartFormPropio from '../chartFormPropio/ChartFormPropio'
import Charts from '../chart/chart'
import Table from '../Table/Table'
import Auxiliar from '../../Auxiliar/Auxiliar'

//import data from '../../sample/data.json'

class DashboardReal extends Component {
    state = {
        data: [],
        dataChart: {},
        showChartFormPropio: false,
        showTable: true,
        element: null
    }

    url = 'https://localhost:44381/api/inversionPropiaItems/'

    services = async (url, method, dataChart) => {
        await fetch(url, {
            method: method, // or 'PUT'
            body: JSON.stringify(dataChart), // data can be `string` or {object}!
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }

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
            });
    }

    post = async formState => {
        /*await this.setState({
            dataChart: {
                meses:
                    [...this.state.dataChart.meses, this.state.dataChart.meses.length],
                ingresosExtrasMensuales: [...this.state.dataChart.ingresosExtrasMensuales, formState.dineroTotal],
                interesesCompuestos: [...this.state.dataChart.interesesCompuestos, formState.dineroTotalIntereses]
            }
        })*/
        let dataChart = {
            meses: "Mes " + this.state.dataChart.meses.length.toString(),
            ingresosExtrasMensuales: parseFloat(formState.dineroTotal),
            interesesCompuestos: parseFloat(formState.dineroTotalIntereses)
        }

        await this.services(this.url, 'POST', dataChart)
            .then()
            .catch(error => console.error('Error:', error))
            .then(response => {
                this.get()
                this.toogle()
            });
    }

    put = async formState => {
        let dataChart = {
            id: this.state.element.id,
            meses: this.state.element.meses,
            ingresosExtrasMensuales: parseFloat(formState.dineroTotal),
            interesesCompuestos: parseFloat(formState.dineroTotalIntereses)
        }

        await this.services(this.url + this.state.element.id, 'PUT', dataChart)
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
        const method = this.state.element ? this.put : this.post
        const chartFormPropio = this.state.showChartFormPropio ?
            <ChartFormPropio
                post={method}
                cancel={this.cancel}
                element={this.state.element}
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