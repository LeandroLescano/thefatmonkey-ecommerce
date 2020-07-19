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
  const [categories, setCategories] = useState([]);
  const [newProducts, setNewProducts] = useState(0);
  const [emailsAuth, setEmailsAuth] = useState([]);

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

  useEffect(() => {}, []);

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
    const db = firebase.database();
    const dbRef = db.ref("products");
    dbRef.on("value", (snapshot) => {
      setState({
        data: [],
        loading: true,
      });
      snapshot.forEach((snapshot) => {
        snapshot.forEach((snapshotChild) => {
          setState((state) => ({
            data: state.data.concat(snapshotChild),
            loading: false,
          }));
        });
      });
    });

    const usersRef = firebase.database().ref("users");
    let emails = [];
    usersRef.on("child_added", (snapshot) => {
      snapshot.forEach((snapshotChild) => {
        emails.push(snapshotChild.val());
      });
      setEmailsAuth(emails);
    });
  }, []);

  return (
    <>
      <Navbar
        log={() => loguear()}
        deslog={() => desloguear()}
        usuario={user}
        emails={emailsAuth}
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
