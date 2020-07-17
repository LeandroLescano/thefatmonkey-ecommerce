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
      const hornoRef = dbRef.child("hornos");
      hornoRef.on("child_added", (snapshot) => {
        setState((state) => ({
          data: state.data.concat(snapshot.val()),
          loading: false,
        }));
      });
      const macetaRef = dbRef.child("macetas");
      macetaRef.on("child_added", (snapshot) => {
        setState((state) => ({
          data: state.data.concat(snapshot.val()),
          loading: false,
        }));
      });
    }
    setState({
      data: [],
      loading: true,
    });
    getProducts();
  }, []);

  return (
    <div className="container">
      <div className="row row-cols-1 row-cols-md-4">
        {state.data.map((item, i) => {
          return <Product product={item} key={i} />;
        })}
      </div>
    </div>
  );
}

export default ProductCatalog;
