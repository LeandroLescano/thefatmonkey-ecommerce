import React, { useState } from "react";
import "../styles/HomePage.css";
import ProductCatalog from "../components/product-catalog";
import CategorySelector from "../components/category-selector";

function HomePage() {
  const [selected, setSelected] = useState(false);
  const [catSelected, setCatSelected] = useState("");

  return (
    <>
      {!selected ? (
        <CategorySelector
          handleSelect={(cat) => {
            setCatSelected(cat);
            setSelected(true);
          }}
        />
      ) : (
        <ProductCatalog category={catSelected} />
      )}
    </>
  );
}

export default HomePage;
