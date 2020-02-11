import React from "react";
import styles from "./Input.module.css";
import classNames from "classnames";

const input = ({label, id, invalid, changed, onChange, ...props}) => {
  return (
    <div>
      <label>{label}</label>
      <input {...props}
             className={classNames({[styles.error]: invalid && changed})}
             onChange={(event) => onChange(id, event.target.value)}/>
    </div>
  );
};

export default input;