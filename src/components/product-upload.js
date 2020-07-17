import React, { useState, useEffect } from "react";
import Product from "./product-card";
import firebase from "firebase/app";
import "firebase/database";
import "firebase/firebase-storage";

function ProductUpload(props) {
  const [state, setState] = useState({
    data: [],
    loading: null,
  });

  useEffect(() => {
    console.log(props.usuario);
    if (props.usuario !== null) {
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
    } else {
      window.location.href = "/";
    }
  }, [props]);

  return (
    <div className="container">
      <table class="table">
        <thead>
          <tr>
            <th scope="col">Nro.</th>
            <th scope="col">Nombre</th>
            <th scope="col">Descripcion</th>
            <th scope="col">Precio</th>
            <th scope="col">Stock</th>
          </tr>
        </thead>
        <tbody>
          {state.data.map((item, i) => {
            return (
              <tr>
                <th scope="row">{i}</th>
                <td>{item.name}</td>
                <td>{item.description}</td>
                <td>${item.price}</td>
                <td>${item.stock}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default ProductUpload;
