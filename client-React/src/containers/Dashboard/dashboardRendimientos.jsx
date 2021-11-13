import React, { Component } from 'react'
import Auxiliar from '../../Auxiliar/Auxiliar'
import Botonera from '../../components/Botonera/botonera'
import Charts from '../../components/chart/chart'
import Table from '../../components/Table/Table'
import Cards from '../../components/Cards/Cards'

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
            <Cards
                porcentajePromedio={this.props.registros.porcentajePromedio}
                gananciaPromedio={this.props.registros.gananciaPromedio}
                gananciaDiaPromedio={this.props.registros.gananciaDiaPromedio}
            />
        </Auxiliar>
    }
}

export default DashboardRendimientos