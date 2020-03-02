import React, {Component} from "react";
import styles from "./Input.module.css";
import classNames from "classnames";

class Input extends Component {

  input = React.createRef();

  render() {
    const {label, id, type, invalid, changed, onChange, ...props} = this.props;

    return (
      <div>
        <label>{label}</label>
        <input {...props}
               type={type}
               ref={this.input}
               className={classNames({[styles.error]: invalid && changed})}
               onChange={(event) => onChange(id, event.target.value, type, this.input.current)}/>
      </div>
    );
  }



};

export default Input;