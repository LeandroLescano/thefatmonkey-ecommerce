import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import firebase from "firebase/app";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

firebase.initializeApp({
  apiKey: "AIzaSyCNG8Fv0FtzlrYx1ZrucjH7nD0VGILuH5k",
  authDomain: "dubelier-ecommerce.firebaseapp.com",
  databaseURL: "https://dubelier-ecommerce-default-rtdb.firebaseio.com",
  projectId: "dubelier-ecommerce",
  storageBucket: "dubelier-ecommerce.appspot.com",
  messagingSenderId: "842879086425",
  appId: "1:842879086425:web:6bf1466f1c1749cbbd6648",
  measurementId: "G-EZTT7ZSPRZ",
});
ReactDOM.render(<App />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
