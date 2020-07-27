import React, { useState, useEffect } from "react";
import Product from "../components/product-card";
import firebase from "firebase/app";
import JumbotronNoProducts from "./jumbotron-no-products";
import "firebase/database";
import "firebase/firebase-storage";
import Loading from "./loading";
import SideBar from "./side-bar";

function ProductCatalog() {
  const [categories, setCategories] = useState([]);
  const [selectCategory, setSelectCategory] = useState("");
  const [state, setState] = useState({
    data: [],
    loading: null,
  });

  useEffect(() => {
    function getProducts() {
      const db = firebase.database();
      const dbRef = db.ref("products");
      dbRef.on("child_added", (snapshot) => {
        let categoryAct =
          snapshot.key.charAt(0).toUpperCase() + snapshot.key.slice(1);
        setCategories((categories) => [...categories, categoryAct]);
        snapshot.forEach((snapshotChild) => {
          setState((state) => ({
            ...state,
            data: state.data.concat(snapshotChild),
          }));
        });
        setState((state) => ({ ...state, loading: false }));
      });
    }
    setCategories([]);
    setState({
      data: [],
      loading: true,
    });
    getProducts();
  }, []);

  return (
    <div className="container-fluid">
      {state.loading ? (
        <Loading />
      ) : !state.loading &&
        state.data.filter((prod) => prod.val().state) <= 0 ? (
        <JumbotronNoProducts />
      ) : (
        <>
          <div className="row">
            <div className="col">
              <SideBar
                changeCategory={(item) => setSelectCategory(item)}
                categories={categories}
              />
            </div>
            <div className="col-md-9 ml-sm-auto col-lg-10 px-md-4">
              <div className="row row-cols-1 row-cols-md-4 pb-3">
                {/* <div className="card-columns ml-sm-auto px-md-4"> */}
                {state.data
                  .filter((product) => product.val().state)
                  .map((item, i) => {
                    return (
                      <Product
                        product={item}
                        key={i}
                        show={selectCategory.toLowerCase()}
                      />
                    );
                  })}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default ProductCatalog;
