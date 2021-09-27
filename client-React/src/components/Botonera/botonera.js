import React, { Component } from 'react'
import Boton from './boton/boton'

class Botonera extends Component {
    render() {
        return (<div className="row pb-2">
            <Boton
                instrumento={{ nombre: "Todos" }}
                className="btn btn-success col-12"
                onClick={() => this.props.onClick(this.props.idCentral)}
            />
            {
                this.props.instrumentos.map(instrumento => {
                    return <Boton
                        instrumento={instrumento}
                        className="btn btn-success col-12"
                        onClick={() => this.props.onClick(instrumento._id)}
                        key={instrumento._id}
                    />
                })
            }
            <Boton
                instrumento={{ nombre: "Agregar Mes" }}
                className="btn btn-primary col-12"
                onClick={this.props.toogle}
            />
        </div>)
    }
}

export default Botonera