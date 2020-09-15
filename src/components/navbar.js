import React, { useState, useEffect } from "react";
import "../styles/navbar.css";
import Swal from "sweetalert2";
import firebase from "firebase/app";
import "firebase/database";
import "firebase/firebase-storage";
import "firebase/auth";
import ProfileImg from "../images/default.jpg";
import { Link } from "react-router-dom";
import { useStoreActions } from "easy-peasy";

function Navbar() {
  const [admin, setAdmin] = useState(false);
  const [user, setUser] = useState(null);
  const [profileImg, setProfileImg] = useState(ProfileImg);
  const [emailsAuth, setEmailsAuth] = useState([]);

  // const todos = useStoreState((state) => state.todos.items);
  const add = useStoreActions((actions) => actions.todos.add);

  document.addEventListener("DOMContentLoaded", () => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        add(user);
      } else {
        if (window.location.pathname === "/administrar") {
          window.location.href = "/";
        }
      }
    });
  });

  const changeNavbarActive = (btn) => {
    if (btn === "Administrar") {
      document.getElementById("btnProductos").classList.remove("active");
      if (document.getElementById("btnAdministrar") !== null) {
        document.getElementById("btnAdministrar").classList.add("active");
      }
    } else {
      if (document.getElementById("btnAdministrar") !== null) {
        document.getElementById("btnAdministrar").classList.remove("active");
      }
      document.getElementById("btnProductos").classList.add("active");
    }
  };

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
            setAdmin(false);
            if (window.location.pathname === "/administrar") {
              window.location.href = "/";
            }
          })
          .catch((error) => console.log(error.message));
      }
    });
  };

  useEffect(() => {
    const dbRef = firebase.database().ref("users");
    let emails = [];
    dbRef.on("child_added", (snapshot) => {
      snapshot.forEach((snapshotChild) => {
        emails.push(snapshotChild.val());
      });
      setEmailsAuth(emails);
    });
  }, []);

  useEffect(() => {
    let path = window.location.pathname;
    let mounted = true;
    firebase
      .database()
      .ref("profileImg")
      .once("value", (snapshot) => {
        add({ profilePath: snapshot.val() });
        firebase
          .storage()
          .ref(snapshot.val())
          .getDownloadURL()
          .then((url) => {
            if (mounted) {
              add({ profileImg: url });
              setProfileImg(url);
            }
          })
          .catch((error) => {
            console.log(error.message);
          });
      });
    if (user !== null && emailsAuth.length > 0) {
      if (emailsAuth.includes(user.email)) {
        add({ admin: true });
        setAdmin(true);
      } else {
        console.log(emailsAuth, user.email);
        if (path === "/administrar") {
          window.location.href = "/";
        }
      }
    }
    return () => (mounted = false);
  }, [user, emailsAuth, add]);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link to="/">
        <div className="navbar-brand">
          <img
            style={{ borderRadius: "50%" }}
            height="50px"
            width="50px"
            alt="logo"
            src={profileImg}
          />
        </div>
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarCategories"
        aria-controls="navbarCategories"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarCategories">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link
              to="/"
              className="nav-link active"
              id="btnProductos"
              onClick={() => changeNavbarActive("Productos")}
            >
              <p className="navbar-btn text-center">Productos</p>
            </Link>
          </li>
        </ul>
        {admin && (
          <div className="navbar-nav mr-2">
            <div id="btnAdministrar" className="nav-item">
              <Link
                to="/administrar"
                className="nav-link"
                onClick={() => changeNavbarActive("Administrar")}
              >
                <p className="navbar-btn text-center">Administrar</p>
              </Link>
            </div>
          </div>
        )}
        {user !== null && (
          <div className="navbar-nav mr-2 text-center">
            <form>
              <span className="mr-3 align-middle">{user.displayName}</span>
              <img
                alt="user-img"
                height="40"
                width="40"
                className="rounded-circle img-user"
                src={user.photoURL}
                onClick={() => desloguear()}
              />
            </form>
          </div>
        )}
        {user == null && (
          <div className="navbar-nav text-center">
            <div className="btn btn-secondary" onClick={() => loguear()}>
              Ingresar
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
