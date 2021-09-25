import React, { Component } from 'react'
import Boton from './boton/boton'

class Botonera extends Component {
    render() {
        return (<div className="row pb-2">
            <Boton
                registro={{ nombre: "Todos" }}
                className="btn btn-success col-12"
                onClick={() => this.props.onClick(this.props.idCentral)}
            />
            {
                this.props.registros.map(registro => {
                    return <Boton
                        registro={registro}
                        className="btn btn-success col-12"
                        onClick={() => this.props.onClick(registro._id)}
                        key={registro._id}
                    />
                })
            }
            <Boton
                registro={{ nombre: "Agregar Mes" }}
                className="btn btn-primary col-12"
                onClick={this.props.toogle}
            />
        </div>)
    }
}

export default Botonera