import React, { useState, useEffect } from "react";
import firebase from "firebase/app";
import "firebase/firebase-storage";
import "../styles/product-card.css";
import Loading from "../components/loading";

function ProductCard(props) {
  const [url, setUrl] = useState(null);

  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(false);
    let referencia = props.product.img;
    firebase
      .storage()
      .ref(referencia)
      .getDownloadURL()
      .then((url) => {
        setUrl(url);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, [props.product.img]);

  const showCard = () => {
    setShow(true);
  };

  return (
    <>
      {(props.show === props.product.category || props.show === "") && (
        <div className="col mb-4">
          <div className="card product-card img-fluid">
            {!show && <Loading />}
            <img
              style={show ? {} : { display: "none" }}
              src={url}
              className="card-img-top"
              alt="..."
              onLoad={() => showCard()}
            />
            <div className="card-body">
              <h5 className="card-title">{props.product.name}</h5>
              <p className="card-text text-card">{props.product.description}</p>
              <p className="card-text text-price">${props.product.price} c/u</p>
              <p className="card-text text-card">
                Stock: {props.product.stock}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ProductCard;
