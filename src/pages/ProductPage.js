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
import { Link } from "react-router-dom";

function ProductPage({ addProducts }) {
  const [url, setUrl] = useState([]);
  const [state, setState] = useState({
    product: {},
    loading: true,
  });

  const toCapitalizeLetter = (text) => {
    if (text.length > 0) {
      return text[0].toUpperCase() + text.slice(1);
    }
  };

  useEffect(() => {
    let mounted = true;
    if (Object.keys(state.product).length !== 0) {
      state.product.img.forEach((image) => {
        let referencia = image;
        if (referencia !== undefined) {
          if (mounted) {
            setUrl((stateUrl) => [
              ...stateUrl,
              "https://storage.googleapis.com/thefatmonkey-ecommerce.appspot.com/" +
                referencia,
            ]);
            setState((state) => ({
              ...state,
              loading: false,
            }));
          }
        }
        //   firebase
        //     .storage()
        //     .ref(referencia)
        //     .getDownloadURL()
        //     .then((url) => {
        //       if (mounted) {
        //         setUrl((stateUrl) => [...stateUrl, url]);
        //         setState((state) => ({
        //           ...state,
        //           loading: false,
        //         }));
        //       }
        //     })
        //     .catch((error) => {
        //       console.log(error.message);
        //     });
        // }
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
    let productCategory = decodeURI(
      path.substring(path.indexOf("/") + 1, path.lastIndexOf("/"))
    );
    let productKey = path.substring(path.lastIndexOf("/") + 1);
    const db = firebase.database();
    const dbRef = db
      .ref()
      .child("/products/" + productCategory + "/" + productKey);
    dbRef.on("value", (snapshot) => {
      if (snapshot.val() !== null) {
        let prod = snapshot.val();
        prod["key"] = snapshot.key;
        if (mounted) {
          setState((state) => ({
            ...state,
            product: prod,
          }));
        }
      }
    });
    return () => (mounted = false);
  }, []);

  const updateShoppingCart = (prod) => {
    addProducts({
      product: prod,
      amount: 1,
      description: "",
      url: url[0],
    });
  };

  return (
    <>
      {state.loading || url === null ? (
        <Loading />
      ) : (
        <div className="container mt-1">
          <Link to="/" className="txt-back text-decoration-none">
            Volver a los productos
          </Link>
          <span className="txt-breadcrumb d-none d-md-inline-block ml-1">
            | Categoria:{" "}
            {toCapitalizeLetter(state.product.category.replace(/_/g, " "))}
          </span>
          <div className="container-product">
            <div className="section-product-page img-section">
              <Carousel url={url} />
            </div>
            <div className="section-product-page data-section">
              <h2>{state.product.name}</h2>
              <p className="txt-desc">{state.product.description}</p>
              <div className="row m-2 pt-2 border-top justify-content-lg-end form-add-cart">
                <div className="col-auto my-auto">
                  <div className="row">
                    {state.product.discount && state.product.discount > 0 && (
                      <span className="badge mr-2 align-self-center badge-discount">
                        {state.product.discount}% OFF
                      </span>
                    )}
                    <h4 className="my-0">
                      {state.product.discount && state.product.discount > 0 ? (
                        <>
                          <del style={{ color: "lightgrey" }}>
                            ${state.product.price}{" "}
                          </del>
                          {"$" +
                            (state.product.price *
                              (100 - state.product.discount)) /
                              100}
                        </>
                      ) : (
                        "$" + state.product.price
                      )}
                      *
                    </h4>
                  </div>
                </div>
                <div className="col-auto">
                  <button
                    className="btn btn-pink ml-2 btn-add"
                    onClick={() => {
                      updateShoppingCart(state.product);
                    }}
                  >
                    Agregar al carrito
                  </button>
                </div>
              </div>
              <p className="text-muted txt-price-desc">
                * Precio por producto base, puede variar dependiendo el tamaño o
                adicionales.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default connect(null, { addProducts })(ProductPage);
