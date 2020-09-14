import React, { Component } from 'react'
import Chart from 'chart.js'

class Charts extends Component {
    chartRef = React.createRef();

    componentDidUpdate() {
        const ctx = this.chartRef.current.getContext("2d");
        new Chart(ctx, {
            type: "line",
            data: {
                //Bring in data
                labels: this.props.meses,
                datasets: [
                    {
                        label: "Dinero inicial",
                        data: this.props.inicial,
                        borderColor: 'black',
                        backgroundColor: 'rgba(255,255,255,0)',
                        borderWidth: 2
                    }
                    , {
                        label: "Ingreso Extra Mensual",
                        data: this.props.ingresoExtraMensual,
                        borderColor: 'blue',
                        backgroundColor: 'rgba(255,255,255,0)',
                        borderWidth: 2
                    },
                    {
                        label: "Interes Compuesto",
                        data: this.props.datos,
                        borderColor: 'green',
                        backgroundColor: 'rgba(255,255,255,0)',
                        borderWidth: 2,
                    }
                ]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
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