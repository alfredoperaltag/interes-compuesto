import React, { Component } from 'react'
import Auxiliar from '../../Auxiliar/Auxiliar'
import Boton from './boton/boton'

class Botonera extends Component {

    click = async id => await this.props.get(id)

    render() {
        return (<Auxiliar>
            <div className="row justify-content-center">
                <div className='col-12'>
                    <h1 className="p-3">Instrumentos</h1>
                </div>
            </div>
            <div className="row pb-2">
                <Boton
                    instrumento={{ nombre: "Todos" }}
                    className="btn btn-success col-12"
                    onClick={() => this.click(this.props.idCentral)}
                />
                {
                    this.props.instrumentos.map(instrumento => {
                        return <Boton
                            background={instrumento.color}
                            instrumento={instrumento}
                            className="btn btn-primary col-12"
                            onClick={() => this.click(instrumento._id)}
                            key={instrumento._id}
                        />
                    })
                }
                <Boton
                    instrumento={{ nombre: "Agregar Mes" }}
                    className="btn btn-primary col-12"
                    onClick={this.props.toogle}
                />
            </div>
        </Auxiliar>)
    }
}

export default Botonera