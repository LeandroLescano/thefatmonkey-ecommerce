import React from "react";

function navbar() {
  return (
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <a class="navbar-brand" href="#">
        <img
          style={{ borderRadius: "50%" }}
          height="60px"
          width="60px"
          src="https://instagram.faep9-1.fna.fbcdn.net/v/t51.2885-19/s150x150/106581789_713587769216315_4930581092014284635_n.jpg?_nc_ht=instagram.faep9-1.fna.fbcdn.net&_nc_ohc=zxRvX-gOyoEAX_o-WSo&oh=3d01471a6228c70e956f82a9d878d549&oe=5F3770C6"
        />
      </a>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              id="navbarDropdown"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Productos
            </a>
            <div class="dropdown-menu" aria-labelledby="navbarDropdown">
              <a class="dropdown-item" href="#">
                Tazas
              </a>
              <a class="dropdown-item" href="#">
                Hornitos
              </a>
              <div class="dropdown-divider"></div>
              <a class="dropdown-item" href="#">
                Tablas
              </a>
            </div>
          </li>
        </ul>
        <form class="form-inline my-2 my-lg-0">
          <input
            class="form-control mr-sm-2"
            type="search"
            placeholder="Buscar"
            aria-label="Search"
          />
          <button class="btn btn-outline-secondary my-2 my-sm-0" type="submit">
            <svg
              width="1em"
              height="1em"
              viewBox="0 0 16 16"
              class="bi bi-search"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M10.442 10.442a1 1 0 0 1 1.415 0l3.85 3.85a1 1 0 0 1-1.414 1.415l-3.85-3.85a1 1 0 0 1 0-1.415z"
              />
              <path
                fill-rule="evenodd"
                d="M6.5 12a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11zM13 6.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0z"
              />
            </svg>
          </button>
        </form>
      </div>
    </nav>
  );
}

export default navbar;
