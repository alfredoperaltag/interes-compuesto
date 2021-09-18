import React from 'react'

const Input = props => {
  if (props.type === "number") {
    return <div className="form-group col-sm-12 col-md-6">
      <label>{props.children} </label>
      <input
        type={props.type}
        className="form-control"
        id={props.id}
        min={props.min}
        value={props.value}
        onChange={props.onChange}
        step={props.step}
      />
    </div>
  }
  return <div className="form-group col-sm-12 col-md-6">
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