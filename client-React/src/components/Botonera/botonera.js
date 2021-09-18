import React, { Component } from 'react'

class Botonera extends Component {
    render() {
        return this.props.registros.map(registro => {
            return <div className="col-lg-2" key={registro._id}>
                <button type="button" className="btn btn-success col-12" onClick={() => this.props.onClick(registro._id)}>{registro.nombre}</button>
            </div>
        })
    }
}

export default Botonera