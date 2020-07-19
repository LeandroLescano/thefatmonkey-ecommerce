import React, { useState, useEffect } from "react";
import Product from "../components/product-card";
import firebase from "firebase/app";
import "firebase/database";
import "firebase/firebase-storage";

function ProductCatalog() {
  const [state, setState] = useState({
    data: [],
    loading: null,
  });

  useEffect(() => {
    function getProducts() {
      const db = firebase.database();
      const dbRef = db.ref("products");
      dbRef.on("child_added", (snapshot) => {
        snapshot.forEach((snapshot) => {
          setState((state) => ({
            data: state.data.concat(snapshot.val()),
            loading: false,
          }));
        });
      });
    }
    setState({
      data: [],
      loading: true,
    });
    getProducts();
  }, []);

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <nav
            id="sidebarMenu"
            className="colmd-3 col-lg-2 d-md-block bg-light sidebar collapse"
          >
            <div className="sidebar-sticky pt-3">
              <ul className="nav flex-column">
                <li className="nav-item">
                  <a href="/#" className="nav-link">
                    Hornos
                  </a>
                </li>
                <li className="nav-item">
                  <a href="/#" className="nav-link">
                    Macetas
                  </a>
                </li>
                <li className="nav-item">
                  <a href="/#" className="nav-link">
                    Tazas
                  </a>
                </li>
              </ul>
            </div>
          </nav>
          <div className="col-md-9 ml-sm-auto col-lg-10 px-md-4">
            <div className="row row-cols-1 row-cols-md-4">
              {state.data.map((item, i) => {
                return <Product product={item} key={i} />;
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductCatalog;
