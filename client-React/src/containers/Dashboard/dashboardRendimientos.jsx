import React, { Component } from 'react'
import Auxiliar from '../../Auxiliar/Auxiliar'
import Botonera from '../../components/Botonera/botonera'
import Charts from '../../components/chart/chart'
import Table from '../../components/Table/Table'

class DashboardRendimientos extends Component {

    render() {
        return <Auxiliar>
            <h1 className="p-3">Rendimientos</h1>
            <Botonera
                instrumentos={this.props.instrumentos}
                idCentral={this.props.idCentral}
                toogle={this.props.toogle}
                onClick={this.click}
                get={this.props.get}
            />
            <Charts
                dataChart={this.props.registros.dataChart}
            />
            <Table
                data={this.props.registros.data}
                idCentral={this.props.idCentral}
                url={this.props.url}
                get={this.props.get}
            />
        </Auxiliar>
    }
}

export default DashboardRendimientos