import React, { Component } from 'react'
import Chart from 'chart.js'
import Auxiliar from '../../Auxiliar/Auxiliar';

//let myChart

class Charts extends Component {
    chartRef = React.createRef();

    componentDidMount() {
        const ctx = this.chartRef.current.getContext("2d");
        if (typeof this.myChart !== "undefined") this.myChart.destroy()
        this.myChart = new Chart(ctx, {
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
                        lineTension: 0
                    },
                    {
                        label: "Ingreso Extra Mensual",
                        data: this.props.ingresosExtrasMensuales,
                        borderColor: 'blue',
                        backgroundColor: 'rgba(255,255,255,0)',
                        borderWidth: 2,
                        lineTension: 0
                    },
                    {
                        label: "Dinero inicial",
                        data: this.props.dinerosIniciales,
                        borderColor: 'black',
                        backgroundColor: 'rgba(255,255,255,0)',
                        borderWidth: 2,
                        lineTension: 0
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
    componentDidUpdate() {
        const ctx = this.chartRef.current.getContext("2d");
        if (typeof this.myChart !== "undefined") this.myChart.destroy()
        this.myChart = new Chart(ctx, {
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
                        lineTension: 0
                    },
                    {
                        label: "Ingreso Extra Mensual",
                        data: this.props.ingresosExtrasMensuales,
                        borderColor: 'blue',
                        backgroundColor: 'rgba(255,255,255,0)',
                        borderWidth: 2,
                        lineTension: 0
                    },
                    {
                        label: "Dinero inicial",
                        data: this.props.dinerosIniciales,
                        borderColor: 'black',
                        backgroundColor: 'rgba(255,255,255,0)',
                        borderWidth: 2,
                        lineTension: 0
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
        return <Auxiliar>
            <canvas
                id="myChart"
                ref={this.chartRef}
            />
        </Auxiliar>
    }
}

export default Charts