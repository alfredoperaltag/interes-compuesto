import React, { Component } from "react";

class Header extends Component{

    render(){
        return(<header className="d-flex justify-content-center py-3">
        <ul className="nav nav-pills">
          <li className="nav-item"><button type="button" className="nav-link active" aria-current="page" onClick={this.props.toogleDashboard}>Rendimientos</button></li>
          <li className="nav-item"><button type="button" className="nav-link" onClick={this.props.toogleInstrumentos}>Instrumentos</button></li>
        </ul>
      </header>)
    }

}

export default Header