import React, { Component } from 'react'

import ChartFormPropio from '../chartFormPropio/ChartFormPropio'
import Charts from '../chart/chart'
import Table from '../Table/Table'

//import data from '../../sample/data.json'

class DashboardReal extends Component {
    state = {
        data: [],
        dataChart: {}
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
        console.log(JSON.stringify(dataChart));
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
            });
    }

    async componentDidMount() {
        await this.fetchData()
    }

    edit = (id) => {
        console.log("click edit", id);
    }
    delete = async (id) => {
        console.log("click", id);
        await fetch('https://localhost:44381/api/inversionPropiaItems/' + id, {
            method: 'DELETE', // or 'PUT'
        }).then(res => res.json())
            .catch(error => console.error('Error:', error))
            .then(response => {
                this.fetchData()
            });
    }

    render() {
        return (<div>
            <h2>Datos Propios Reales</h2>
            <ChartFormPropio getDataChart={this.getDataChart} />
            <Charts
                meses={this.state.dataChart.meses}
                ingresosExtrasMensuales={this.state.dataChart.ingresosExtrasMensuales}
                interesesCompuestos={this.state.dataChart.interesesCompuestos}
            />
            <Table data={this.state.data} edit={this.edit} delete={this.delete} />
        </div>)
    }
}

export default DashboardReal