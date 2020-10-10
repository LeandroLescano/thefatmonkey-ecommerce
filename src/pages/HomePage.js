import React, { useState, useEffect } from "react";
import "../styles/HomePage.css";
import ProductCatalog from "../components/product-catalog";
import CategorySelector from "../components/category-selector";

function HomePage() {
  const [selected, setSelected] = useState(false);
  const [catSelected, setCatSelected] = useState("");

  document.addEventListener("DOMContentLoaded", () => {
    if (window.sessionStorage.getItem("catSelected") !== null) {
      changeCategory(window.sessionStorage.getItem("catSelected"));
    }
  });

  const changeCategory = (cat) => {
    setCatSelected(cat);
    setSelected(true);
  };

  useEffect(() => {
    if (window.sessionStorage.getItem("catSelected") !== null) {
      changeCategory(window.sessionStorage.getItem("catSelected"));
    }
  }, []);

  return (
    <>
      {!selected ? (
        <CategorySelector
          handleSelect={(cat) => {
            window.sessionStorage.setItem("catSelected", cat);
            changeCategory(cat);
          }}
        />
      ) : (
        <ProductCatalog category={catSelected} />
      )}
    </>
  );
}

export default HomePage;
