import React, { Component } from 'react'

class Form extends Component {
    handleSubmit = (event) => {
        event.preventDefault();
        this.props.method()
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <div className="row">
                    <div className="col">
                        <h1>{this.props.title}</h1>
                    </div>
                </div>
                <div className="row justify-content-center">
                    {this.props.children}
                </div>
            </form>
        )
    }
}

export default Form