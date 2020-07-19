import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import firebase from "firebase/app";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

firebase.initializeApp({
  apiKey: "AIzaSyBBodUp6hxMxCcsH4qX3gAHi3ZpyZlNFoI",
  authDomain: "thefatmonkey-ecommerce.firebaseapp.com",
  databaseURL: "https://thefatmonkey-ecommerce.firebaseio.com",
  projectId: "thefatmonkey-ecommerce",
  storageBucket: "thefatmonkey-ecommerce.appspot.com",
  messagingSenderId: "575085913143",
  appId: "1:575085913143:web:23d1e15480a95aa1668bb2",
  measurementId: "G-J3F1RBRHPR",
});
ReactDOM.render(<App />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
