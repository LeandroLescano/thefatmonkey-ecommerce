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
import ShoppingCart from "./shopping-cart";
import switchFlagCategory from "../redux/actions/flagCategory";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import ReactDOM from "react-dom";

function Navbar(props) {
  const [admin, setAdmin] = useState(false);
  const [user, setUser] = useState(null);
  const [profileImg, setProfileImg] = useState(ProfileImg);
  const [emailsAuth, setEmailsAuth] = useState([]);
  const [DOMReady, setDOMReady] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // const todos = useStoreState((state) => state.todos.items);
  const add = useStoreActions((actions) => actions.todos.add);

  const loginContainer = document.getElementById("loginContainer");

  window.addEventListener("resize", () => {
    if (window.innerWidth > 768) {
      setIsMobile(false);
    } else {
      setIsMobile(true);
    }
  });

  window.addEventListener("load", () => {
    console.log(window.sessionStorage.getItem("catSelected"));
    if (window.innerWidth > 768) {
      setIsMobile(false);
    } else {
      setIsMobile(true);
    }
  });

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
      if (window.sessionStorage.getItem("catSelected") !== null) {
        props.switchFlagCategory();
      }
    });
  });

  const changeNavbarActive = (btn) => {
    if (btn === "Administrar") {
      document.getElementById("btnProductos").classList.remove("active");
      document.getElementById("btnNosotros").classList.remove("active");
      if (document.getElementById("btnAdministrar") !== null) {
        document.getElementById("btnAdministrar").classList.add("active");
      }
    } else if (btn === "Productos") {
      // Swal.fire({
      //   title: "¿Te interesa aprender a realizar nuestros productos?",
      //   html:
      //     "<h3>Unite a nuestro taller</h3> <p>Hace <a style='color:#E75480' href='#'>click acá</a> para ver más información!</p>",
      //   showConfirmButton: false,
      //   showCancelButton: true,
      //   cancelButtonText: "Cerrar",
      // });
      if (document.getElementById("btnAdministrar") !== null) {
        document.getElementById("btnAdministrar").classList.remove("active");
      }
      document.getElementById("btnNosotros").classList.remove("active");
      document.getElementById("btnProductos").classList.add("active");
    } else {
      if (document.getElementById("btnAdministrar") !== null) {
        document.getElementById("btnAdministrar").classList.remove("active");
      }
      document.getElementById("btnNosotros").classList.add("active");
      document.getElementById("btnProductos").classList.remove("active");
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
    setDOMReady(true);
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
      {props.flagCategory && (
        <>
          {isMobile && <ShoppingCart />}
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
              {props.flagCategory && (
                <>
                  <li className="nav-item">
                    <Link
                      to="/"
                      className="nav-link"
                      id="btnCategorias"
                      onClick={() => props.switchFlagCategory()}
                    >
                      <p className="navbar-btn text-center">Categorias</p>
                    </Link>
                  </li>
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
                  <li className="nav-item">
                    <Link
                      to="/nosotros"
                      className="nav-link"
                      id="btnNosotros"
                      onClick={() => changeNavbarActive("Nosotros")}
                    >
                      <p className="navbar-btn text-center">Nosotros</p>
                    </Link>
                  </li>
                </>
              )}
            </ul>
            <div className="navbar-nav mr-2 text-center">
              {props.flagCategory && !isMobile && <ShoppingCart />}
              {admin && (
                <div>
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
              )}
            </div>
          </div>
        </>
      )}
      {user == null &&
        DOMReady &&
        ReactDOM.createPortal(
          <>
            <div className="txt-login ml-2" onClick={() => loguear()}>
              Ingresar
            </div>
          </>,
          loginContainer
        )}
    </nav>
  );
}
const mapStateToProps = (state) => ({ flagCategory: state.flags.flagCategory });

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ switchFlagCategory }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
