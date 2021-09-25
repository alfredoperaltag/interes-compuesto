import React, { Component } from 'react'

import ChartFormPropio from '../../containers/chartFormPropio/ChartFormPropio'
import Charts from '../../components/chart/chart'
import Table from '../../components/Table/Table'
import Auxiliar from '../../Auxiliar/Auxiliar'
import services from '../../services/services'
import servicesRegistros from '../../services/servicesRegistros'
import Botonera from '../../components/Botonera/botonera'

import Swal from 'sweetalert2'

class DashboardReal extends Component {
    state = {
        data: [],
        dataChart: {},
        showChartFormPropio: false,
        showDashboard: true,
        element: null,
        showInputMes: true,
        registros: []
    }

    url = 'http://localhost:3000/api/registros/'
    idCentral = "6136e4ee3874300d8ceab12f"

    get = async url => {
        let meses = [], ingresosExtrasMensuales = [], interesesCompuestos = []
        await fetch(this.url + url, {
        }).then(res => res.json())
            .catch(error => console.error('Error:', error))
            .then(response => {
                response.forEach(element => {
                    meses.push(element.mes)
                    ingresosExtrasMensuales.push(element.ingreso_actual)
                    interesesCompuestos.push(element.total)
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
        await services(this.url + "/registro_central", 'POST', dataChart)
            .then()
            .catch(error => console.error('Error:', error))
            .then(response => {
                this.get(this.idCentral)
                this.toogle()
            });
    }

    /*put = async dataChart => {
        await services(this.url + this.state.element.id, 'PUT', dataChart)
            .then()
            .catch(error => console.error('Error:', error))
            .then(response => {
                this.get()
                this.toogle()
                this.elementNull()
            });
    }*/

    delete = async mes => {
        console.log(mes)
        await fetch(this.url + "/registro_central/" + mes, {
            method: 'DELETE', // or 'PUT'
        }).then(res => res.json())
            .catch(error => console.error('Error:', error))
            .then(response => {
                this.get(this.idCentral)
                Swal.fire({
                    title: '¡Eliminado!',
                    icon: 'success',
                    timer: 1250,
                    timerProgressBar: true
                })
            });
    }

    submit = async formState => {
        const dataChart = {
            mes: formState.meses,
            registros: []
        }
        const registros = []
        formState.registros.forEach(registro => {
            let idInputDineroTotal = "dineroTotal" + registro._id
            let idInputDineroTotalIntereses = "dineroTotalIntereses" + registro._id
            registros[registro._id] = { instrumento: registro._id }

            for (const key in formState)
                if (key === idInputDineroTotal)
                    registros[registro._id].ingreso_actual = parseFloat(formState[key])
                else if (key === idInputDineroTotalIntereses)
                    registros[registro._id].total = parseFloat(formState[key])

            dataChart.registros.push(registros[registro._id])
        })
        if (this.state.element) {
            console.log("put", dataChart);
            //await this.put(dataChart)
        } else {
            console.log("post", dataChart);
            await this.post(dataChart)
        }
    }

    async componentDidMount() {
        await this.get(this.idCentral)
        await new servicesRegistros().get()
            .then(res => this.setState({
                registros: res
            }))
            .catch(error => console.error('Error:', error))
    }

    /*edit = element => {
        this.toogle()
        this.setState({
            element: element
        })
    }*/

    cancel = () => {
        this.toogle()
        this.elementNull()
    }

    toogle = () => {
        this.setState({
            showChartFormPropio: !this.state.showChartFormPropio,
            showDashboard: !this.state.showDashboard,
        })
    }

    elementNull = () => this.setState({
        element: null
    })

    click = async id => await this.get(id)

    render() {
        const showDashboard = this.state.showDashboard ?
            <Auxiliar>
                <h1 className="p-3">Rendimientos</h1>
                <Botonera
                    registros={this.state.registros}
                    onClick={this.click}
                    idCentral={this.idCentral}
                    toogle={this.toogle}
                />
                <Charts
                    meses={this.state.dataChart.meses}
                    ingresosExtrasMensuales={this.state.dataChart.ingresosExtrasMensuales}
                    interesesCompuestos={this.state.dataChart.interesesCompuestos}
                />
                <Table
                    data={this.state.data}
                    delete={this.delete}
                />
            </Auxiliar> : null
        const chartFormPropio = this.state.showChartFormPropio ?
            <ChartFormPropio
                submit={this.submit}
                cancel={this.cancel}
                element={this.state.element}
                showInputMes={this.state.showInputMes}
                registros={this.state.registros}
            /> : null

        return <Auxiliar>
            {showDashboard}
            {chartFormPropio}
        </Auxiliar>
    }
}

export default DashboardReal