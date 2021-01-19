import React, { useState, useEffect } from "react";
import firebase from "firebase/app";
import "firebase/database";
import "firebase/firebase-storage";
import "firebase/auth";
import Loading from "../components/loading";
import Carousel from "../components/carousel-product";
import "../styles/ProductPage.css";
import { connect } from "react-redux";
import addProducts from "../redux/actions/addProducts";

function ProductPage({ addProducts }) {
  const [url, setUrl] = useState([]);
  const [state, setState] = useState({
    product: {},
    loading: null,
  });
  const [amount, setAmount] = useState(1);
  const [description, setdescription] = useState("");

  useEffect(() => {
    let mounted = true;
    if (Object.keys(state.product).length !== 0) {
      state.product.img.forEach((image) => {
        let referencia = image;
        if (referencia !== undefined) {
          firebase
            .storage()
            .ref(referencia)
            .getDownloadURL()
            .then((url) => {
              if (mounted) {
                setUrl((stateUrl) => [...stateUrl, url]);
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
    }
    return () => (mounted = false);
  }, [state.product]);

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
      let prod = snapshot.val();
      prod["key"] = snapshot.key;
      if (mounted) {
        setState((state) => ({
          ...state,
          product: prod,
        }));
      }
    });
    return () => (mounted = false);
  }, []);

  const updateShoppingCart = (prod) => {
    console.log(url[0]);
    addProducts({
      product: prod,
      amount: amount,
      description: description,
      url: url[0],
    });
  };

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
              <div className="form-inline">
                <div className="form-group">
                  <input
                    className="form-control"
                    style={{ width: "100px" }}
                    id="amountProduct"
                    type="number"
                    min="1"
                    value={amount}
                    onChange={(ref) => setAmount(+ref.target.value)}
                  />
                  <button
                    className="btn btn-pink ml-2"
                    onClick={() => {
                      updateShoppingCart(state.product);
                    }}
                  >
                    Agregar al carrito
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default connect(null, { addProducts })(ProductPage);
