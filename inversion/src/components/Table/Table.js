import React, { Component } from 'react'

class Table extends Component {
    state = ({
        showModal: false,
        showTable: true,
        idDelete: null
    })

    alert = (id) => {
        this.setState({
            showModal: true,
            showTable: false,
            idDelete: id
        })
    }

    closeModal = () => {
        this.setState({
            showModal: false,
            showTable: true,
            idDelete: null
        })
    }

    delete = () => {
        this.props.delete(this.state.idDelete)
        this.setState({
            showModal: false,
            showTable: true,
            idDelete: null
        })
    }

    render() {
        const modal = this.state.showModal ? <div tabIndex="-1" role="dialog">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Eliminar</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <p>¿Esta seguro de eliminar {this.state.idDelete}</p>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-danger" onClick={this.delete}>Eliminar</button>
                        <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={this.closeModal}>Cancelar</button>
                    </div>
                </div>
            </div>
        </div> : null

        const table = this.state.showTable ? <table className="table">
            <thead className="thead-dark">
                <tr>
                    <th scope="col">Mes</th>
                    <th scope="col">Ingreso Extra Mensual</th>
                    <th scope="col">Interes Compuesto</th>
                    <th>Editar</th>
                    <th>Eliminar</th>
                </tr>
            </thead>
            <tbody>
                {this.props.data.map(element =>
                    <tr key={element.id}>
                        <th scope="row">{element.meses}</th>
                        <td>{element.ingresosExtrasMensuales}</td>
                        <td>{element.interesesCompuestos}</td>
                        <td><button onClick={this.props.edit.bind(this, element.id)} className="btn btn-warning">Editar</button></td>
                        {/* <td><button onClick={()=>this.props.delete(element.id)} className="btn btn-danger">Eliminar</button></td> */}
                        <td><button onClick={() => this.alert(element.id)} className="btn btn-danger">Eliminar</button></td>
                    </tr>
                )}
            </tbody>
        </table> : null

        return (<div>
            {modal}
            {table}
        </div>
        )
    }
}

export default Table