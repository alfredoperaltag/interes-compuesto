import React, { Component } from 'react'
import Input from '../../components/Form/inputs/input'

class InputsRegistro extends Component {
    render() {
        return this.props.registros.map(registro => {
            return (<div className="col-sm-12" key={registro._id}>
                <h5>{registro.nombre}</h5>
                <div className="row">
                    <Input type="number" min="0" step="0.001" id={"dineroTotal" + registro._id} value={this.props.dineroTotal} onChange={this.props.onChange}>Dinero Ingresado: </Input>
                    <Input type="number" min="0" step="0.001" id={"dineroTotalIntereses" + registro._id} value={this.props.dineroTotalIntereses} onChange={this.props.onChange}>Dinero Total con Intereses: </Input>
                </div>
            </div>)
        })
    }
}

export default InputsRegistro