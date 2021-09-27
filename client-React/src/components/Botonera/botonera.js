import React, { Component } from 'react'
import Boton from './boton/boton'

class Botonera extends Component {

    click = async id => await this.props.get(id)

    render() {
        return (<div className="row pb-2">
            <Boton
                instrumento={{ nombre: "Todos" }}
                className="btn btn-success col-12"
                onClick={() => this.click(this.props.idCentral)}
            />
            {
                this.props.instrumentos.map(instrumento => {
                    return <Boton
                        instrumento={instrumento}
                        className="btn btn-success col-12"
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
        </div>)
    }
}

export default Botonera