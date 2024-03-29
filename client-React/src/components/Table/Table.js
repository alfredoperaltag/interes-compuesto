import React, { Component } from 'react'

import Swal from 'sweetalert2'

class Table extends Component {

    delete = async id_central => {
        await fetch(this.props.url + "/registro_central/" + id_central, {
            method: 'DELETE', // or 'PUT'
        }).then(res => res.json())
            .catch(error => console.error('Error:', error))
            .then(async response => {
                await this.props.get(this.props.idCentral)
                this.props.getPorMes(this.props.idUltimoMes)
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
            title: '¿Esta seguro de eliminar todos los registros relacionados de este mes: ' + element.mes + '?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: `Eliminar`,
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                this.delete(element.id_central)
            }
        })
    }

    pintaTdSpan = (clase, texto, propiedad) => (<td>
        <span className={"badge bg-" + clase + " " + texto}>
            {propiedad}
        </span>
    </td>)

    render() {
        return (<div className="table-responsive">
            <table className="table table-sm text-white">
                <thead className="thead-light">
                    <tr>
                        <th scope="col">Mes</th>
                        <th scope="col">Dinero Ingresado</th>
                        <th scope="col">Ultimo Aporte</th>
                        <th scope="col">Total</th>
                        <th>Porcentaje</th>
                        <th>Ganancia</th>
                        <th>Ganancia Diaria</th>
                        <th>Ganancia Historica</th>
                        <th>Portafolio</th>
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
                            <td>{element.aporte}</td>
                            <td>{element.total}</td>
                            {this.pintaTdSpan("secondary", "text-light", element.porcentaje)}
                            {this.pintaTdSpan("primary", "text-light", element.ganancia)}
                            {this.pintaTdSpan("white", "text-dark", element.ganancia_dia)}
                            {this.pintaTdSpan("success", "text-light", element.ganancia_historica)}
                            {this.pintaTdSpan("secondary", "text-light", element.portafolio)}
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