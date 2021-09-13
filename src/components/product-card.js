import React, { useState, useEffect } from "react";
import "../styles/product-card.css";
import Loading from "../components/loading";
import imgSoldOut from "../images/sinstock.png";
import { Link } from "react-router-dom";

function ProductCard(props) {
  const [url, setUrl] = useState(null);
  const [soldOut, setSoldOut] = useState(false);
  const [show, setShow] = useState(false);

  useEffect(() => {
    let mounted = true;
    if (props.product.val().stock <= 0) {
      setSoldOut(true);
    }
    if (url === null) {
      let referencia = props.product.val().img[0];
      if (mounted) {
        setUrl(
          "https://storage.googleapis.com/thefatmonkey-ecommerce.appspot.com/" +
            referencia
        );
      }
      // firebase
      //   .storage()
      //   .ref(referencia)
      //   .getDownloadURL()
      //   .then((url) => {
      //     if (mounted) {
      //       setUrl(url);
      //     }
      //   })
      //   .catch((error) => {
      //     console.log(error.message);
      //   });
      return () => (mounted = false);
    }
  }, [props.product, url]);

  const showCard = () => {
    console.log("showwwwwCard", url, show);
    setShow(true);
  };

  return (
    <>
      {(props.show === props.product.val().category || props.show === "") && (
        <div className="col">
          <Link
            className="link-card"
            to={
              "/product/" +
              props.product.val().category +
              "/" +
              props.product.key
            }
          >
            <div className="card product-card">
              {!show && <Loading />}
              <div className="img-container">
                <img
                  style={show ? {} : { display: "none" }}
                  src={url}
                  className={
                    soldOut
                      ? "card-img-top img-fluid img-card-product sold-out"
                      : "img-fluid img-card-product card-img-top"
                  }
                  alt="..."
                  onLoad={() => showCard()}
                />
                <img
                  style={soldOut && show ? {} : { display: "none" }}
                  src={imgSoldOut}
                  alt="..."
                  className="sold-out-img"
                />
              </div>
              <div className="card-body">
                <h5 className="card-title">{props.product.val().name}</h5>
                <p className="card-text text-card text-description">
                  {props.product.val().description}
                </p>
                <p className="card-text text-price">
                  ${props.product.val().price} c/u
                </p>
                <p className="card-text text-card">
                  {props.product.val().stock > 0
                    ? `Stock: ${props.product.val().stock} unidad(es)`
                    : "Sin stock"}
                </p>
                <div className="text-right">
                  <p className="link-more">Ver más</p>
                </div>
              </div>
            </div>
          </Link>
        </div>
      )}
    </>
  );
}

export default ProductCard;
