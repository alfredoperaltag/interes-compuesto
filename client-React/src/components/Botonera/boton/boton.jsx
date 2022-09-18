import React, { Component } from "react";

class Boton extends Component {
    render() {
        return <div className="col-lg-2 p-1">
            <button type="button"
                className={this.props.className}
                style={{ background: this.props.background, borderColor: this.props.background }}
                onClick={() => this.props.onClick(this.props.instrumento._id)}>
                {this.props.instrumento.nombre}
            </button>
        </div>
    }
}

export default Boton