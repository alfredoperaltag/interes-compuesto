import React, { Component } from 'react'

import ChartFormPropio from '../chartFormPropio/ChartFormPropio'
import Charts from '../chart/chart'
import Table from '../Table/Table'

//import data from '../../sample/data.json'

class DashboardReal extends Component {
    state = {
        data: [],
        dataChart: {},
        showChartFormPropio: false,
        element: null
    }

    fetchData = async () => {
        let meses = [], ingresosExtrasMensuales = [], interesesCompuestos = []
        await fetch('https://localhost:44381/api/inversionPropiaItems', {
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

    getDataChart = async formState => {
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
            ingresosExtrasMensuales: formState.dineroTotal,
            interesesCompuestos: formState.dineroTotalIntereses
        }
        await fetch('https://localhost:44381/api/inversionPropiaItems', {
            method: 'POST', // or 'PUT'
            body: JSON.stringify(dataChart), // data can be `string` or {object}!
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
            .catch(error => console.error('Error:', error))
            .then(response => {
                this.fetchData()
                this.toogleForm(response)
            });
    }

    putData = async formState => {
        let dataChart = {
            id: this.state.element.id,
            meses: this.state.element.meses,
            ingresosExtrasMensuales: formState.dineroTotal,
            interesesCompuestos: formState.dineroTotalIntereses
        }
        await fetch('https://localhost:44381/api/inversionPropiaItems/' + this.state.element.id, {
            method: 'PUT',
            body: JSON.stringify(dataChart), // data can be `string` or {object}!
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
            .catch(error => console.error('Error:', error))
            .then(response => {
                this.fetchData()
                this.toogleForm(dataChart)
            });
    }

    async componentDidMount() {
        await this.fetchData()
    }

    edit = (element) => {
        this.toogleForm(element)
    }
    delete = async (id) => {
        await fetch('https://localhost:44381/api/inversionPropiaItems/' + id, {
            method: 'DELETE', // or 'PUT'
        }).then(res => res.json())
            .catch(error => console.error('Error:', error))
            .then(response => {
                this.fetchData()
            });
    }
    toogleForm = (element) => {
        if (element.id) {
            this.setState({
                element: element
            })
        } else {
            this.setState({
                element: null
            })
        }
        this.setState({
            showChartFormPropio: !this.state.showChartFormPropio
        })
    }
    render() {
        const method = this.state.element ? this.putData : this.getDataChart
        const chartFormPropio = this.state.showChartFormPropio ? <ChartFormPropio getDataChart={method} toogleForm={this.toogleForm} element={this.state.element} />
            : <button className="btn btn-primary" onClick={this.toogleForm}>Agregar Mes</button>
        return (<div>
            <h2>Datos Propios Reales</h2>
            <Charts
                meses={this.state.dataChart.meses}
                ingresosExtrasMensuales={this.state.dataChart.ingresosExtrasMensuales}
                interesesCompuestos={this.state.dataChart.interesesCompuestos}
            />
            {chartFormPropio}
            <Table data={this.state.data} edit={this.edit} delete={this.delete} />
        </div>)
    }
}

export default DashboardReal