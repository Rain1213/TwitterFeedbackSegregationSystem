import React, { Component } from "react";
import './Input.css';

class Input extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: "",
    }

    this.handleOnChange = this.handleOnChange.bind(this);
  }

  handleOnChange(event) {
    event.stopPropagation();
    this.setState({value: event.target.value});
  }

  get value() {
    return this.state.value;
  }

  render() {
  return (
    <div className="textInput">
      <input
        type="text"
        placeholder={this.props.placeholder}
        value={this.state.value}
        onChange={this.handleOnChange}
      ></input>
      <div className="icon-wrapper">
        <i className={`icon ${this.props.icon}`}></i>
        </div>
    </div>
  );
  }
}

export default Input;
