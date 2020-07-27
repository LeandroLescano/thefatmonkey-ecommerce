import React, { useState, useEffect } from "react";
import firebase from "firebase/app";
import "firebase/database";
import "firebase/firebase-storage";
import "firebase/auth";
import Loading from "../components/loading";
import Carousel from "../components/carousel-product";
import "../styles/ProductPage.css";

function ProductPage() {
  const [url, setUrl] = useState(null);
  const [state, setState] = useState({
    product: {},
    loading: null,
  });

  useEffect(() => {
    let mounted = true;
    setState((state) => ({
      ...state,
      loading: true,
    }));
    //Get data of product from the BD
    let path = window.location.pathname.slice(1);
    let productCategory = path.substring(
      path.indexOf("/") + 1,
      path.lastIndexOf("/")
    );
    let productKey = path.substring(path.lastIndexOf("/") + 1);
    const db = firebase.database();
    const dbRef = db
      .ref()
      .child("/products/" + productCategory + "/" + productKey);
    dbRef.on("value", (snapshot) => {
      setState((state) => ({
        ...state,
        product: snapshot.val(),
      }));
      //Get image of the product from the BD
      let referencia = state.product.img;
      if (referencia !== undefined) {
        firebase
          .storage()
          .ref(referencia)
          .getDownloadURL()
          .then((url) => {
            if (mounted) {
              setUrl(url);
              setState((state) => ({
                ...state,
                loading: false,
              }));
            }
          })
          .catch((error) => {
            console.log(error.message);
          });
      }
    });
    return () => (mounted = false);
  }, [state.product.img]);

  return (
    <>
      {state.loading || url === null ? (
        <Loading />
      ) : (
        <div className="container">
          <div className="container-product">
            <div className="section-product-page img-section">
              <Carousel url={url} />
            </div>
            <div className="section-product-page data-section">
              <h2>{state.product.name}</h2>
              <h5>{state.product.description}</h5>
              <div className="row">
                <div className="col-auto">
                  <h5 className="text-price">
                    ${state.product.price} por unidad
                  </h5>
                </div>
                <div className="col-auto">
                  <h5>Stock: {state.product.stock}</h5>
                </div>
              </div>
              <h5>
                ¿Querés comprar? Contactame por Instagram:{" "}
                <a
                  href="https://www.instagram.com/thefatmonkeydeco/"
                  target="blank_"
                >
                  The Fat Monkey Deco
                </a>
              </h5>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ProductPage;
