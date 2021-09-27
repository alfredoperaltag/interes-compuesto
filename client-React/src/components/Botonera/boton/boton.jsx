import React, { Component } from "react";

class Boton extends Component {
    render() {
        return <div className="col-lg-2">
            <button type="button"
                className={this.props.className}
                onClick={() => this.props.onClick(this.props.instrumento._id)}>
                {this.props.instrumento.nombre}
            </button>
        </div>
    }
}

export default Boton