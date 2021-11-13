import React, { Component } from "react";

class Card extends Component {

    render() {
        return <div className="col-4">
            <div className={"card text-white bg-" + this.props.class + " mb-3"}>
                <div className="card-body">
                    <h5 className="card-title">{this.props.titulo} promedio: {this.props.porcentaje}</h5>
                </div>
            </div>
        </div>
    }
}

export default Card