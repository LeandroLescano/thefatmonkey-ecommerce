import React, { useState, useEffect } from "react";
import firebase from "firebase/app";
import "firebase/firebase-storage";
import "../styles/component-product.css";

function Product(props) {
  const [url, setUrl] = useState(null);

  useEffect(() => {
    let referencia = props.product.img;
    let pathReference = firebase
      .storage()
      .ref(referencia)
      .getDownloadURL()
      .then((url) => {
        setUrl(url);
      })
      .catch((error) => {
        console.log(error.message);
      });
  });

  return (
    <React.Fragment>
      <div class="card" style={{ width: "18rem" }}>
        <img src={url} className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title">{props.product.name}</h5>
          <p className="card-text">{props.product.description}</p>
          <p className="card-text text-price">${props.product.price} c/u</p>
          <p className="card-text">Stock: {props.product.stock}</p>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Product;
