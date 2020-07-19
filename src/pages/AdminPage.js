import React, { useState, useEffect } from "react";
import Navbar from "../components/navbar";
import firebase from "firebase/app";
import "firebase/database";
import "firebase/firebase-storage";
import "firebase/auth";
import Swal from "sweetalert2";
import "../styles/AdminPage.css";
import TableProduct from "../components/table-products";
import UploadProduct from "../components/upload-product";

function AdminPage() {
  const [user, setUser] = useState(null);

  const [newProducts, setNewProducts] = useState(0);

  const [state, setState] = useState({
    data: [],
    loading: null,
  });

  document.addEventListener("DOMContentLoaded", () => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setUser({ user: user });
      } else {
        window.location.href = "/";
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

  useEffect(() => {
    setState({
      data: [],
      loading: true,
    });
    const db = firebase.database();
    const dbRef = db.ref("products");
    dbRef.on("child_added", (snapshot) => {
      snapshot.forEach((snapshot) => {
        setState((state) => ({
          data: state.data.concat(snapshot.val()),
          loading: false,
        }));
      });
    });
  }, [newProducts]);

  return (
    <>
      <Navbar
        log={() => loguear()}
        deslog={() => desloguear()}
        usuario={user}
      />
      {user !== null && (
        <div className="container">
          <div className="float-right">
            <UploadProduct new={() => setNewProducts(newProducts + 1)} />
          </div>
          <TableProduct productos={state.data} />
        </div>
      )}
    </>
  );
}

export default AdminPage;
