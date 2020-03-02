import React, {Component} from 'react';
import styles from "./App.module.css";
import RegisterForm from "./components/register/RegisterForm";
import LoginForm from "./components/login/LoginForm";
import RecipesWidget from "./components/recipes/RecipesWidget";
import TodoWidget from "./components/todo/TodoWidget";
import {BrowserRouter, Route, Redirect} from 'react-router-dom';
import PrivateRoute from "./routing/PrivateRoute";
import RecipeDetails from "./components/recipes/RecipeDetails";
import FireBaseWidget from "./components/firebase/FireBaseWidget";
import firebase from "firebase";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDSgBy7c-i37jRV6aPZ6jLVmQrANoXt97Q",
  authDomain: "mentorship-project-e7003.firebaseapp.com",
  databaseURL: "https://mentorship-project-e7003.firebaseio.com",
  projectId: "mentorship-project-e7003",
  storageBucket: "mentorship-project-e7003.appspot.com",
  messagingSenderId: "165646046553",
  appId: "1:165646046553:web:406a3b24dcd290d0f0a848",
  measurementId: "G-B9ENCKBQZP"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
//firebase.analytics();

class App extends Component {
  render() {
    return (
      <BrowserRouter forceRefresh={true}>
        <div className={styles.app}>
          <Route path="/firebase" component={FireBaseWidget}/>
          <Route path="/login" component={LoginForm} />
          <Route path="/register" component={RegisterForm} />
          <Route exact path="/" render={() => <Redirect to="/recipes" />} />
          <PrivateRoute path="/recipes" exact component={RecipesWidget} />
          <PrivateRoute path="/recipes/:id" component={RecipeDetails} />
          <PrivateRoute path="/todo" component={TodoWidget} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;