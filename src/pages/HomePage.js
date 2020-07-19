import React, { useState } from "react";
import Navbar from "../components/navbar";
import "../styles/HomePage.css";
import ProductCatalog from "../components/product-catalog";
import firebase from "firebase/app";
import "firebase/database";
import "firebase/firebase-storage";
import "firebase/auth";
import Swal from "sweetalert2";

function HomePage() {
  // const [loaded, setLoaded] = useState(false);
  const [user, setUser] = useState(null);

  document.addEventListener("DOMContentLoaded", () => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setUser({ user: user });
      }
    });
  });

  const loguear = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        setUser(result);
      })
      .catch((error) => console.log(error.message));
  };

  const desloguear = () => {
    Swal.fire({
      title: "¿Deseas salir de tu cuenta?",
      reverseButtons: true,
      showCancelButton: true,
      cancelButtonText: "Cancelar",
      confirmButtonText: "Salir",
    }).then((result) => {
      if (result.value) {
        firebase
          .auth()
          .signOut()
          .then(function () {
            setUser(null);
          })
          .catch((error) => console.log(error.message));
      }
    });
  };

  return (
    <>
      <Navbar
        log={() => loguear()}
        deslog={() => desloguear()}
        usuario={user}
      />
      <ProductCatalog />
    </>
  );
}

export default HomePage;
