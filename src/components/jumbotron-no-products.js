import React from "react";

function JumbotronNoProducts() {
  return (
    <div className="jumbotron m-5">
      <h1 className="display-4">Lo siento!</h1>
      <p className="lead">En este momento no poseemos productos disponibles</p>
      <hr className="my-4" />
      <p>No dejes de visitar nuestro Instagram!</p>
      <a
        className="btn btn-blue btn-lg"
        href="https://www.instagram.com/dubelier_/"
        role="button"
      >
        Dubelier
      </a>
    </div>
  );
}

export default JumbotronNoProducts;
