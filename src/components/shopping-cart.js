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
        src="data:image/svg+xml;base64,PHN2ZyBpZD0iQ2FwYV8xIiBlbmFibGUtYmFja2dyb3VuZD0ibmV3IDAgMCA1MTIgNTEyIiBoZWlnaHQ9IjUxMiIgdmlld0JveD0iMCAwIDUxMiA1MTIiIHdpZHRoPSI1MTIiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPjxsaW5lYXJHcmFkaWVudCBpZD0iU1ZHSURfMV8iIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIiB4MT0iMjU2IiB4Mj0iMjU2IiB5MT0iNTEyIiB5Mj0iMCI+PHN0b3Agb2Zmc2V0PSIwIiBzdG9wLWNvbG9yPSIjZmZiZWY5Ii8+PHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjZmZmMWZmIi8+PC9saW5lYXJHcmFkaWVudD48bGluZWFyR3JhZGllbnQgaWQ9IlNWR0lEXzJfIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgeDE9IjI1Ni4wMzYiIHgyPSIyNTYuMDM2IiB5MT0iMTIyLjczNSIgeTI9IjM4OS4yNjUiPjxzdG9wIG9mZnNldD0iMCIgc3RvcC1jb2xvcj0iI2E5M2FmZiIvPjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iI2ZmODFmZiIvPjwvbGluZWFyR3JhZGllbnQ+PGc+PGc+PGNpcmNsZSBjeD0iMjU2IiBjeT0iMjU2IiBmaWxsPSJ1cmwoI1NWR0lEXzFfKSIgcj0iMjU2Ii8+PC9nPjxnPjxnPjxwYXRoIGQ9Im0yMDIuNzI4IDMxOC4xOWgxNTkuOTE4YzMuODE4IDAgNy4yMTktMi40NDcgOC40MzMtNi4wNzNsMzUuNTM3LTEwNi42MTJjLjkwMi0yLjcwNy40NTEtNS42OTEtMS4yMzItOC4wMDgtMS42NjYtMi4zMTctNC4zMzgtMy42ODgtNy4yMDEtMy42ODhoLTIyNC41OGwtMjEuNjY1LTY1LjAwMWMtMS4yMTUtMy42MjYtNC42MTYtNi4wNzMtOC40MzMtNi4wNzNoLTI5LjYyYy00LjkxMSAwLTguODg0IDMuOTc0LTguODg0IDguODg1czMuOTc0IDguODg0IDguODg0IDguODg0aDIzLjIxN2w1NC4xNTYgMTYyLjUxMmMtOC45NzEgNC4yOTUtMTUuMTgzIDEzLjQ2NS0xNS4xODMgMjQuMDU5IDAgMTQuNjk3IDExLjk1NiAyNi42NTMgMjYuNjUzIDI2LjY1M2gxMC41MjFjLS45OTYgMi43OTMtMS42MzcgNS43NTQtMS42MzcgOC44ODQgMCAxNC42OTggMTEuOTU2IDI2LjY1MyAyNi42NTMgMjYuNjUzczI2LjY1My0xMS45NTYgMjYuNjUzLTI2LjY1M2MwLTMuMTMtLjY0MS02LjA5MS0xLjYzNy04Ljg4NGg1Ni41NzljLS45OTYgMi43OTMtMS42MzcgNS43NTQtMS42MzcgOC44ODQgMCAxNC42OTggMTEuOTU2IDI2LjY1MyAyNi42NTMgMjYuNjUzczI2LjY1My0xMS45NTYgMjYuNjUzLTI2LjY1My0xMS45NTYtMjYuNjUzLTI2LjY1My0yNi42NTNoLTE0Mi4xNDhjLTQuODkzIDAtOC44ODQtMy45ODItOC44ODQtOC44ODRzMy45OS04Ljg4NSA4Ljg4NC04Ljg4NXptMTE1Ljc1Ni00Ni41NzMgOC44ODQtMzUuNTM3YzEuMTgtNC43NzIgNS45MzQtNy42NTIgMTAuNzc2LTYuNDY0IDQuNzcyIDEuMTg5IDcuNjUyIDYuMDEyIDYuNDcyIDEwLjc2N2wtOC44ODQgMzUuNTM3Yy0xLjE4OCA0Ljc3Mi02LjAyNCA3LjY1MS0xMC43NzYgNi40NjMtNC43NzEtMS4xODgtNy42NTItNi4wMTEtNi40NzItMTAuNzY2em0tNDQuNjgyLTMzLjM4NmMwLTQuOTExIDMuOTc0LTguODg1IDguODg0LTguODg1IDQuOTExIDAgOC44ODQgMy45NzQgOC44ODQgOC44ODV2MzUuNTM3YzAgNC45MTEtMy45NzQgOC44ODQtOC44ODQgOC44ODQtNC45MTEgMC04Ljg4NC0zLjk3NC04Ljg4NC04Ljg4NHptLTQ2LjU3My04LjYxNWM0LjY2OC0xLjIwNiA5LjU5NiAxLjY5MiAxMC43NzYgNi40NjRsOC44ODQgMzUuNTM3YzEuMTggNC43NTUtMS43MDEgOS41NzgtNi40NzIgMTAuNzY3LTQuNjU2IDEuMTkyLTkuNTc0LTEuNjM3LTEwLjc3Ni02LjQ2M2wtOC44ODQtMzUuNTM3Yy0xLjE4LTQuNzU2IDEuNy05LjU3OSA2LjQ3Mi0xMC43Njh6IiBmaWxsPSJ1cmwoI1NWR0lEXzJfKSIvPjwvZz48L2c+PC9nPjwvc3ZnPg=="
      />
    </div>
  );
}

const mapStateToProps = (state) => ({ shoppingCart: state.shoppingCart });

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ deleteProduct }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingCart);
