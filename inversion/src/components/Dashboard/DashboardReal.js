import React, { Component } from 'react'

import ChartFormPropio from '../chartFormPropio/ChartFormPropio'
import Charts from '../chart/chart'

import data from '../../sample/data.json'

class DashboardReal extends Component {
    state = {
        data: data
    }

    getDataChart = async formState => {
        /*await this.setState({
            data: {
                meses:
                    [...this.state.data.meses, this.state.data.meses.length],
                ingresosExtrasMensuales: [...this.state.data.ingresosExtrasMensuales, formState.dineroTotal],
                interesesCompuestos: [...this.state.data.interesesCompuestos, formState.dineroTotalIntereses]
            }
        })*/
        let data = {
            meses: this.state.data.meses.length.toString(),
            ingresosExtrasMensuales: formState.dineroTotal,
            interesesCompuestos: formState.dineroTotalIntereses
        }
        console.log(JSON.stringify(data));
        await fetch('https://localhost:44381/api/inversionPropiaItems', {
            method: 'POST', // or 'PUT'
            body: JSON.stringify(data), // data can be `string` or {object}!
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
            .catch(error => console.error('Error:', error))
            .then(response => {
                console.log(response);
                
            });
    }

    render() {
        return (<div>
            <h2>Datos Propios Reales</h2>
            <ChartFormPropio getDataChart={this.getDataChart} />
            <Charts
                meses={this.state.data.meses}
                ingresosExtrasMensuales={this.state.data.ingresosExtrasMensuales}
                interesesCompuestos={this.state.data.interesesCompuestos}
            />
        </div>)
    }
}

export default DashboardReal