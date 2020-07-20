import React from "react";

function JumbotronNoProducts() {
  return (
    <div class="jumbotron m-5">
      <h1 class="display-4">Lo siento!</h1>
      <p class="lead">En este momento no poseemos productos disponibles</p>
      <hr class="my-4" />
      <p>No dejes de visitar nuestro Instagram!</p>
      <a
        class="btn btn-pink btn-lg"
        href="https://www.instagram.com/thefatmonkeydeco/"
        role="button"
      >
        The fat monkey deco
      </a>
    </div>
  );
}

export default JumbotronNoProducts;
