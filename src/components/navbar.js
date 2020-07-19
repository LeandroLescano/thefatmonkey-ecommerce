import React from "react";
import "../styles/navbar.css";

function navbar(props) {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <a className="navbar-brand" href="/">
        <img
          style={{ borderRadius: "50%" }}
          height="60px"
          width="60px"
          alt="logo"
          src="https://instagram.faep9-1.fna.fbcdn.net/v/t51.2885-19/s150x150/106581789_713587769216315_4930581092014284635_n.jpg?_nc_ht=instagram.faep9-1.fna.fbcdn.net&_nc_ohc=zxRvX-gOyoEAX_o-WSo&oh=3d01471a6228c70e956f82a9d878d549&oe=5F3770C6"
        />
      </a>
      <div className="collapse navbar-collapse" id="navbarCategories">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <a className="nav-link" id="navbarDropdown" href="/#">
              Productos
            </a>
          </li>
        </ul>
        {props.usuario !== null &&
          props.usuario.user.email === "tatilescano11@gmail.com" && (
            <div className="navbar-nav mr-2">
              <div className="nav-item">
                <a href="/administrar" className="nav-link">
                  Administrar
                </a>
              </div>
            </div>
          )}
        {props.usuario !== null && (
          <div className="navbar-nav mr-2">
            <form>
              <span className="mr-3 align-middle">
                {props.usuario.user.displayName}
              </span>
              <img
                alt="user-img"
                height="40"
                width="40"
                className="rounded-circle img-user"
                src={props.usuario.user.photoURL}
                onClick={props.deslog}
              />
            </form>
          </div>
        )}
        {props.usuario == null && (
          <form className="form-inline my-2 my-lg-0">
            <div className="btn btn-secondary" onClick={props.log}>
              Ingresar
            </div>
          </form>
        )}
      </div>
    </nav>
  );
}

export default navbar;
