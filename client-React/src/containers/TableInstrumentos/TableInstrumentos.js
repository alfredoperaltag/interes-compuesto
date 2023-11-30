import React, { Component } from "react";
import Header from "../../components/Header/Header";

class TableInstrumentos extends Component {
    render() {
        return (<div>
            <Header toogleDashboard={this.props.toogleDashboard}/>
            <div className="table-responsive">
                <table className="table table-sm text-white">
                    <thead className="thead-light">
                        <tr>
                            <th scope="col">Nombre</th>
                            <th>Fecha</th>
                            <th>Eliminar</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="row">prueba</th>
                            <td>prueba</td>
                        </tr>

                    </tbody>
                </table>
            </div>
        </div>
        )
    }
}

export default TableInstrumentos