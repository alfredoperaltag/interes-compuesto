import React, { Component } from 'react'
import Chart from 'chart.js'

let myChart

class Charts extends Component {
    chartRef = React.createRef();

    componentDidUpdate() {
        const ctx = this.chartRef.current.getContext("2d");
        if (typeof myChart !== "undefined") myChart.destroy()
        myChart = new Chart(ctx, {
            type: "line",
            data: {
                //Bring in data
                labels: this.props.meses,
                datasets: [
                    {
                        label: "Interes Compuesto",
                        data: this.props.interesesCompuestos,
                        borderColor: 'green',
                        backgroundColor: 'rgba(255,255,255,0)',
                        borderWidth: 2,
                    },
                    {
                        label: "Ingreso Extra Mensual",
                        data: this.props.ingresosExtrasMensuales,
                        borderColor: 'blue',
                        backgroundColor: 'rgba(255,255,255,0)',
                        borderWidth: 2
                    },
                    {
                        label: "Dinero inicial",
                        data: this.props.dinerosIniciales,
                        borderColor: 'black',
                        backgroundColor: 'rgba(255,255,255,0)',
                        borderWidth: 2
                    }
                ]
            },
            options: {
                /* scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }, */ tooltips: {
                    mode: 'x'
                }
            }
        });
    }
    render() {
        return <div>
            <canvas
                id="myChart"
                ref={this.chartRef}
            />
        </div>
    }
}

export default Charts