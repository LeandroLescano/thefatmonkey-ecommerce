import React, { useState } from "react";
import "../styles/HomePage.css";
import ProductCatalog from "../components/product-catalog";
import CategorySelector from "../components/category-selector";
import { connect } from "react-redux";
import switchFlagCategory from "../redux/actions/flagCategory";
import { bindActionCreators } from "redux";

function HomePage(props) {
  const [catSelected, setCatSelected] = useState("");

  const changeCategory = (cat) => {
    props.switchFlagCategory();
    setCatSelected(cat);
  };

  document.addEventListener("DOMContentLoaded", () => {
    if (!props.flagCategory && window.location.pathname !== "/") {
      props.switchFlagCategory();
    }
  });

  return (
    <>
      {!props.flagCategory ? (
        <CategorySelector
          handleSelect={(cat) => {
            window.sessionStorage.setItem("catSelected", cat);
            changeCategory(cat);
          }}
        />
      ) : (
        <>
          <ProductCatalog category={catSelected} />
        </>
      )}
    </>
  );
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ switchFlagCategory }, dispatch);
};

const mapStateToProps = (state) => ({
  flagCategory: state.flags.flagCategory,
});

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
