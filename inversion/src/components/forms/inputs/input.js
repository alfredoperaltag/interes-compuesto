import React from 'react'

const Input = props => {
  if (props.type === "number") {
    return <div className="form-group">
      <label>{props.children} </label>
      <input
        type={props.type}
        className="form-control"
        id={props.id}
        min={props.min}
        value={props.value}
        onChange={props.onChange} />
    </div>
  }
  return <div className="form-group">
    <label>{props.children} </label>
    <input
      type={props.type}
      className="form-control"
      id={props.id}
      value={props.value}
      onChange={props.onChange} />
  </div>
}

export default Input