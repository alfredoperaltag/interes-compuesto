import React, { Component } from "react";
import Auxiliar from '../../Auxiliar/Auxiliar'

class Spans extends Component {
    render() {
        return <Auxiliar>
            <div className="col-3">
                <h1 className="p-3">Dinero a invertir</h1>
                {
                    this.props.dataAInvertir.map(instrumento => {
                        return <p key={instrumento.nombre}>{instrumento.nombre}: ${instrumento.dineroAInvertir.toFixed(2)}</p>
                    })
                }
            </div>
        </Auxiliar>
    }
}

export default Spans