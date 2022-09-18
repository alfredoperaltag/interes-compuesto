import React, { Component } from 'react'
import Chart from 'chart.js'

class Charts extends Component {
    chartRef = React.createRef();

    crearChart = () => {
        const ctx = this.chartRef.current.getContext("2d");
        if (typeof this.chart !== "undefined") this.chart.destroy()
        this.chart = new Chart(ctx, {
            type: this.props.chart.type,
            data: {
                labels: this.props.chart.labels,
                datasets: this.props.chart.datasets
            },
            options: this.props.chart.options
        });
    }

    componentDidMount() {
        this.crearChart()
    }
    componentDidUpdate() {
        this.crearChart()
    }
    render() {
        return <div className={this.props.class}>
            <h1 className="p-3">{this.props.chart.titulo}</h1>
            <canvas
                ref={this.chartRef}
            />
        </div>
    }
}

export default Charts