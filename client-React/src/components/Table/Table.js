import React, { Component } from 'react'

import Swal from 'sweetalert2'

class Table extends Component {

    alert = element => {
        Swal.fire({
            title: '¿Esta seguro de eliminar ' + element.meses + '?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: `Eliminar`,
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                this.props.delete(element.id)
                Swal.fire({
                    title: '¡Eliminado!',
                    icon: 'success',
                    timer: 1250,
                    timerProgressBar: true
                })
            }
        })
    }

    render() {
        return (<div className="table-responsive">
            <table className="table table-sm">
                <thead className="thead-dark">
                    <tr>
                        <th scope="col">Id</th>
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
                            <td>{element.id}</td>
                            <th scope="row">{element.meses}</th>
                            <td>{element.ingresosExtrasMensuales}</td>
                            <td>{element.interesesCompuestos}</td>
                            <td><button onClick={this.props.edit.bind(this, element)} className="btn btn-warning">Editar</button></td>
                            <td><button onClick={() => this.alert(element)} className="btn btn-danger">Eliminar</button></td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
        )
    }
}

export default Table