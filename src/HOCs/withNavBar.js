import React, {Component} from 'react';
import styles from "./withNavBar.module.css";
import {NavLink} from "react-router-dom";

const withNavBar = (WrappedComponent) => {
  return class extends Component {

    handleLogoutClick = () => {
      localStorage.removeItem("userID");
      this.props.history.push("/login");
    };

    render() {
      return (
        <>
          <div className={styles.navigation}>
            <NavLink to="/app/recipes" activeClassName={styles.active}>Recipes</NavLink>
            <NavLink to="/app/todo" activeClassName={styles.active}>Todo</NavLink>
            <button onClick={this.handleLogoutClick}>Logout</button>
          </div>
          <WrappedComponent {...this.props}/>
        </>
      );
    }
  }
};

export default withNavBar;