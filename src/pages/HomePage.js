import React, { useState, useEffect } from "react";
import Navbar from "../components/navbar";
import firebase from "firebase/app";
import "firebase/database";
import "firebase/firebase-storage";
import Product from "../components/component-product";

function HomePage() {
  const [state, setState] = useState({
    data: [],
    loading: null,
  });

  useEffect(() => {
    getProducts();
    setState({
      data: [],
      loading: true,
    });
  }, []);

  const getProducts = () => {
    const db = firebase.database();
    const dbRef = db.ref("products");
    dbRef.on("child_added", (snapshot) => {
      setState({
        data: state.data.concat(snapshot.val()),
        loading: false,
      });
    });
  };

  return (
    <>
      <Navbar />
      <div className="container">
        <h1>The fat monkey deco</h1>
      </div>
      {state.data.map((item, i) => {
        return <Product product={item} />;
      })}
    </>
  );
}

export default HomePage;
