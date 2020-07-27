import React from "react";

function JumbotronNoProducts() {
  return (
    <div className="jumbotron m-5">
      <h1 className="display-4">Lo siento!</h1>
      <p className="lead">En este momento no poseemos productos disponibles</p>
      <hr className="my-4" />
      <p>No dejes de visitar nuestro Instagram!</p>
      <a
        className="btn btn-pink btn-lg"
        href="https://www.instagram.com/thefatmonkeydeco/"
        role="button"
      >
        The fat monkey deco
      </a>
    </div>
  );
}

export default JumbotronNoProducts;
