import React, { Component } from 'react'
import Auxiliar from '../../Auxiliar/Auxiliar'
import Botonera from '../../components/Botonera/botonera'
import Charts from '../../components/chart/chart'
import Table from '../../components/Table/Table'

import Swal from 'sweetalert2'

class DashboardRendimientos extends Component {
    state = {
        registros: {
            data: [],
            dataChart: {
                meses: [],
                ingresosExtrasMensuales: [],
                interesesCompuestos: []
            }
        }
    }

    click = async id => await this.props.get(id)

    delete = async mes => {
        console.log(mes)
        await fetch(this.props.url + "/registro_central/" + mes, {
            method: 'DELETE', // or 'PUT'
        }).then(res => res.json())
            .catch(error => console.error('Error:', error))
            .then(response => {
                this.props.get(this.props.idCentral)
                Swal.fire({
                    title: '¡Eliminado!',
                    icon: 'success',
                    timer: 1250,
                    timerProgressBar: true
                })
            });
    }

    render() {
        return <Auxiliar>
            <h1 className="p-3">Rendimientos</h1>
            <Botonera
                instrumentos={this.props.instrumentos}
                idCentral={this.props.idCentral}
                toogle={this.props.toogle}
                onClick={this.click}
            />
            <Charts
                dataChart={this.props.registros.dataChart}
            />
            <Table
                data={this.props.registros.data}
                delete={this.delete}
            />
        </Auxiliar>
    }
}

export default DashboardRendimientos