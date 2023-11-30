import React, { Component } from 'react'
import Auxiliar from '../../Auxiliar/Auxiliar'
import Botonera from '../../components/Botonera/botonera'
import Charts from '../../components/Chart/chart'
import Table from '../../components/Table/Table'
import Cards from '../../components/Cards/Cards'
import Spans from '../../components/Spans/spans'
import Header from '../../components/Header/Header'

class DashboardRendimientos extends Component {

    render() {
        return <Auxiliar>
            <Header
            toogleInstrumentos={this.props.toogleInstrumentos}
            />
            <Botonera
                instrumentos={this.props.instrumentos}
                idCentral={this.props.idCentral}
                toogle={this.props.toogle}
                onClick={this.click}
                get={this.props.get}
            />
            <div className='row justify-content-center'>
                <Charts chart={this.props.lineChart} class="col-12" />
            </div>
            <Table
                data={this.props.registros.data}
                idCentral={this.props.idCentral}
                url={this.props.url}
                get={this.props.get}
                idUltimoMes={this.props.idUltimoMes}
                getPorMes={this.props.getPorMes}
            />
            <Cards
                porcentajePromedio={this.props.registros.porcentajePromedio}
                gananciaPromedio={this.props.registros.gananciaPromedio}
                gananciaDiaPromedio={this.props.registros.gananciaDiaPromedio}
            />
            <div className='row justify-content-center'>
                <Charts chart={this.props.pieChart} class="col-4" />
                <Charts chart={this.props.doughnutChart} class="col-4" />
                <Spans dataAInvertir={this.props.dataAInvertir} />
            </div>
        </Auxiliar>
    }
}

export default DashboardRendimientos