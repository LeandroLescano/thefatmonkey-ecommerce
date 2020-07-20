import React, { useState, useEffect } from "react";
import Product from "../components/product-card";
import firebase from "firebase/app";
import JumbotronNoProducts from "./jumbotron-no-products";
import "firebase/database";
import "firebase/firebase-storage";

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
            data: state.data.concat(snapshotChild.val()),
            loading: false,
          }));
        });
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
    <>
      <div className="container-fluid">
        {state.data.filter((prod) => prod.state) <= 0 ? (
          <JumbotronNoProducts />
        ) : (
          <div className="row">
            <nav
              id="sidebarMenu"
              className="colmd-3 col-lg-2 d-md-block bg-light sidebar collapse"
            >
              <div className="sidebar-sticky pt-3">
                <ul className="nav flex-column">
                  <li className="nav-item">
                    <a
                      href="/#"
                      className="nav-link"
                      onClick={() => setSelectCategory("")}
                    >
                      Todos
                    </a>
                  </li>
                  {categories.map((item, i) => {
                    return (
                      <li key={i} className="nav-item">
                        <a
                          href="/#"
                          className="nav-link"
                          onClick={() => {
                            setSelectCategory(item);
                          }}
                        >
                          {item}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </nav>
            <div className="col-md-9 ml-sm-auto col-lg-10 px-md-4">
              <div className="row row-cols-1 row-cols-md-4">
                {state.data
                  .filter((product) => product.state)
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
        )}
      </div>
    </>
  );
}

export default ProductCatalog;
