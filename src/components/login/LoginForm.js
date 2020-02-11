import React, { Component } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import Input from "../UI/input/Input";
import styles from "./LoginForm.module.css";

class LoginForm extends Component {

  state = {
    /*emailInput: "a@a.a",
    passwordInput: "123",*/
    formConfig: [{
      id: "email",
      type: "text",
      placeholder: "Email",
      value: "",
      invalid: true,
      changed: false
    }, {
      id: "password",
      type: "password",
      placeholder: "Password",
      value: "",
      invalid: true,
      changed: false
    }]
  };

  inputChangeHandler = (id, value) => {
    const updatedFormConfig = [...this.state.formConfig];
    let updatedFormItem = updatedFormConfig.find(item => item.id === id);
    const itemIndex = updatedFormConfig.indexOf(updatedFormItem);

    updatedFormItem = {
      ...updatedFormConfig.find(item => item.id === id),
      value,
      changed: true,
      invalid: !this.isFormFieldValid(updatedFormItem.id, value)
    };

    updatedFormConfig[itemIndex] = updatedFormItem;

    this.setState({ formConfig: updatedFormConfig });
  };

  isFormFieldValid = (fieldId, value) => {
    switch (fieldId) {
      case "email":
        //var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        //return re.test(String(value).toLowerCase());
        return true;
      case "password":
        return value.length > 0;
    }
  };

  handleLoginClick = () => {
    console.log("handle login");
    axios.post("http://172.22.13.38:1323/users/login", {
      email: this.state.formConfig[0].value,
      password: this.state.formConfig[1].value
    })
      .then(response => {
        console.log("success");
        localStorage.setItem("userID", response.data.id);
        this.props.history.push("/recipes");
      })
      .catch(error => {
        console.log("login error:", error);
      });
  };

  render() {
    const { formConfig } = this.state;

    const isFormInvalid = !!formConfig.some(item => item.invalid);

    return (
      <div className={styles.login}>
        <h3>Login</h3>
        <form onSubmit={this.handleLoginClick}>
          { formConfig.map(item =>
            <Input key={item.id} {...item} onChange={this.inputChangeHandler}/>
            ) }
          <button disabled={isFormInvalid}>Login</button>
          <div><Link to="/register">Register</Link></div>
        </form>
      </div>
    );
  }
}

export default LoginForm;