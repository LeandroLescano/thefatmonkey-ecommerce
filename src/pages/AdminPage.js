import React, { useState, useEffect } from "react";
import firebase from "firebase/app";
import "firebase/database";
import "firebase/firebase-storage";
import "firebase/auth";
import "../styles/AdminPage.css";
import TableProduct from "../components/table-products";
import { useStoreState } from "easy-peasy";

function AdminPage() {
  const [categories, setCategories] = useState([]);
  const [state, setState] = useState({
    data: [],
    loading: null,
  });
  const [admin, setAdmin] = useState(false);
  const todos = useStoreState((state) => state.todos.items);

  useEffect(() => {
    todos.forEach((item) => {
      if (Object.keys(item)[0] === "admin" && Object.values(item)[0] === true) {
        setAdmin(true);
      }
    });
    const db = firebase.database();
    const dbRef = db.ref("products");
    dbRef.on("value", (snapshot) => {
      setState({
        data: [],
        loading: true,
      });
      let cat = [];
      let prod = [];
      snapshot.forEach((snapshot) => {
        let categoryAct =
          snapshot.key.charAt(0).toUpperCase() + snapshot.key.slice(1);
        cat.push(categoryAct);
        snapshot.forEach((snapshotChild) => {
          prod.push(snapshotChild);
        });
        setState((state) => ({ ...state, data: prod, loading: false }));
      });
      setCategories(cat);
    });
  }, [todos]);

  return (
    <>
      {admin && (
        <div className="container">
          <TableProduct categories={categories} productos={state.data} />
        </div>
      )}
    </>
  );
}

export default AdminPage;
