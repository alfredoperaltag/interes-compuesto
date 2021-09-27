import React, { Component } from 'react'

import Swal from 'sweetalert2'

class Table extends Component {

    delete = async mes => {
        console.log(mes)
        await fetch(this.props.url + "/registro_central/" + mes, {
            method: 'DELETE', // or 'PUT'
        }).then(res => res.json())
            .catch(error => console.error('Error:', error))
            .then(response => {
                this.props.get(this.props.idCentral)
                Swal.fire({
                    title: '¡Eliminado!',
                    icon: 'success',
                    timer: 1250,
                    timerProgressBar: true
                })
            });
    }

    alert = element => {
        Swal.fire({
            title: '¿Esta seguro de eliminar todos los registros del mes ' + element.mes + '?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: `Eliminar`,
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                this.delete(element.mes)
            }
        })
    }

    render() {
        return (<div className="table-responsive">
            <table className="table table-sm">
                <thead className="thead-dark">
                    <tr>
                        <th scope="col">Mes</th>
                        <th scope="col">Ingreso Mensual</th>
                        <th scope="col">Interes Compuesto</th>
                        <th>Porcentaje</th>
                        <th>Ganancia</th>
                        <th>Ganancia Historica</th>
                        <th>Días</th>
                        <th>Fecha</th>
                        <th>Eliminar</th>
                    </tr>
                </thead>
                <tbody>
                    {this.props.data.reverse().map(element =>
                        <tr key={element._id}>
                            <th scope="row">{element.mes}</th>
                            <td>{element.ingreso_actual}</td>
                            <td>{element.total}</td>
                            <td><span className="badge bg-secondary text-light">{element.porcentaje}</span></td>
                            <td><span className="badge bg-primary text-light">{element.ganancia}</span></td>
                            <td><span className="badge bg-success text-light">{element.ganancia_historica}</span></td>
                            <td>{element.dias}</td>
                            <td>{new Date(element.createdAt).toLocaleDateString("es-MX", { year: "numeric", month: '2-digit', day: "2-digit" })}</td>
                            <td><button onClick={() => this.alert(element)} className="btn btn-danger btn-sm">Eliminar</button></td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
        )
    }
}

export default Table