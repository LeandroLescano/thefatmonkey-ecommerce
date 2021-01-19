import React, { useState, useEffect } from "react";
import Product from "../components/product-card";
import firebase from "firebase/app";
import JumbotronNoProducts from "./jumbotron-no-products";
import "firebase/database";
import "firebase/firebase-storage";
import Loading from "./loading";
import SideBar from "./side-bar";

function ProductCatalog(props) {
  const [categories, setCategories] = useState([]);
  const [selectCategory, setSelectCategory] = useState("");
  const [state, setState] = useState({
    data: [],
    loading: null,
  });
  const [showCategories, setShowCategories] = useState(false);
  var sidebar = document.getElementById("sidebarMenu");

  window.addEventListener("resize", () => {
    if (sidebar !== null) {
      if (window.innerWidth > 768) {
        sidebar.style.display = "block";
      } else {
        sidebar.style.display = "none";
      }
    }
  });

  window.addEventListener("load", () => {
    sidebar = document.getElementById("sidebarMenu");
    if (window.innerWidth <= 768) {
      sidebar.style.display = "none";
    } else {
      sidebar.style.display = "block";
    }
  });

  useEffect(() => {
    sidebar = document.getElementById("sidebarMenu");
    if (window.innerWidth <= 768) {
      sidebar.style.display = "none";
    }
    setSelectCategory(props.category);
    if (
      document.getElementById("todos") !== null &&
      document.getElementById(props.category) !== null
    ) {
      document.getElementById("todos").classList.remove("active");
      document.getElementById(props.category).classList.add("active");
    }
  }, [props.category]);

  useEffect(() => {
    function getProducts() {
      const db = firebase.database();
      const dbRef = db.ref("products");
      dbRef.once("value").then((snap) => {
        if (snap.exists()) {
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
        } else {
          setState((state) => ({ ...state, loading: false }));
        }
      });
    }
    setCategories([]);
    setState({
      data: [],
      loading: true,
    });
    getProducts();
  }, []);

  const changeStateCategories = () => {
    setShowCategories(!showCategories);
    if (showCategories) {
      sidebar.style.display = "block";
    } else {
      sidebar.style.display = "none";
    }
  };

  return (
    <div className="parent-catalog">
      <div className="section-filter" onClick={() => changeStateCategories()}>
        <span id="btnCategories" className="btn-categories">
          Categorias
          <img
            id="arrow-categories"
            src="https://image.flaticon.com/icons/svg/892/892498.svg"
            height="20"
            width="15"
            alt=""
          />
        </span>
      </div>
      <div className="section-sidebar">
        <SideBar
          changeCategory={(item) => {
            setSelectCategory(item);
            window.sessionStorage.setItem("catSelected", item);
          }}
          categories={categories}
          selectCategory={selectCategory}
        />
      </div>
      <div id="main-catalog" className="container-fluid">
        {state.loading ? (
          <Loading />
        ) : !state.loading &&
          state.data.filter((prod) => prod.val().state) <= 0 ? (
          <JumbotronNoProducts />
        ) : (
          <>
            <div className="row row-cols-1 row-cols-sm-3 row-cols-md-3 row-cols-lg-4 pb-3">
              {/* <div className="card-columns"> */}
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
          </>
        )}
      </div>
    </div>
  );
}

export default ProductCatalog;
