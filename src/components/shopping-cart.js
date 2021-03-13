import React from "react";
import "../styles/shopping-cart.css";
import deleteProduct from "../redux/actions/deleteProduct";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import ListCart from "./list-cart";

function ShoppingCart(props) {
  return (
    <div
      id="shoppingCartIcon"
      className="nav-item mb-2"
      style={{ position: "relative" }}
    >
      <ListCart
        cart={props.shoppingCart}
        deleteProduct={(i) => props.deleteProduct(i)}
      />
      <p className="amountCart">
        {props.shoppingCart.products.length > 0
          ? props.shoppingCart.products.length
          : 0}
      </p>
      <img
        data-toggle={props.shoppingCart.products.length > 0 ? "modal" : ""}
        data-target="#modalCart"
        className="shoppingCart"
        alt="productImg"
        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAB7UlEQVRoQ+2Y3TEEQRSFvw3AXwSIACGIAAEovPKAEESAB/uKEgAykAEiIAN/AVBHzajV07vTe6d7e7Zq+nGrb/f57u0+fWd7TPnoTbl+OoDcFewq0MYKfHtEvQJXwEluwe7+viPkAyjjHoD1NkGMCyDte0U1WsFhAXgC1lqhHoLegSXgxREsAIFkH6E2egdsDKi9Bnazqw+sgHRuAreO4AXgPTdEaAWkU1a6OCD4GDibJoAj4DSjYCVQDigr/xvjVGAeeMsIUJ6CZSuA4vQa72SE+ACUSFMFFLQKPGYEOAd0lM0ACpT/r2SCqLw/49yBUrP8/zIDwHNxAv5tbQHQAvL/uQlDeG3bCiD/P5wwgPfhtAL4+qOUPPdFN1DZwwqghdz+KCXAVrFfVABff5QCouL9TW10MN7tj1IAVLw/JsAk+qOR3x5N7oASkbo/8np/zAqk7o9qW/amFUjdH9V+NMUASNUfDfX+2EdI66Xoj4Z6fwqA2P3RSO9PBaAqqEdq2uRJvOxZH0+1I9YdqN0o1YQOwMnsBbBd/HYDHARm3hoX9NdioAYkYt+Z3A+AsMb9bhXzCH0CMw7AFzBbkwFrXAfgJtZ6FKxx0SugBa2X0RoX9Q6EXvao82Je4qjCQhfrAEIzlWpeV4FUmQ1d9we7tlMxDVRTjQAAAABJRU5ErkJggg=="
      ></img>
    </div>
  );
}

const mapStateToProps = (state) => ({ shoppingCart: state.shoppingCart });

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ deleteProduct }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingCart);
