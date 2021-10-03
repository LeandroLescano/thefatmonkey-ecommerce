import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import modifyProduct from "../redux/actions/modifyProduct";
import { bindActionCreators } from "redux";
import $ from "jquery";
import firebase from "firebase/app";

function ListCart(props) {
  const [number, setNumber] = useState(0);

  const getOrder = () => {
    let encode = "Hola! Te quería realizar el siguiente pedido:";
    props.cart.products.map((item) => {
      if (item.amount > 0) {
        encode += `\n- ${item.product.name} (Cantidad: ${item.amount}`;
        if (item.description !== "") {
          encode += `", descripcion: ${item.description})`;
        } else {
          encode += ")";
        }
      }
      return encode;
    });
    encode += `\nTotal: $${props.cart.totalAmount}`;
    return encodeURI(encode);
  };

  useEffect(() => {
    firebase
      .database()
      .ref("phoneNumber")
      .once("value", (snapshot) => {
        setNumber(snapshot.val());
      });
  }, []);

  useEffect(() => {
    if (props.cart.products.length <= 0) {
      $("#modalCart").modal("hide");
    }
  }, [props]);

  const changeAmount = (e, i) => {
    props.modifyProduct(e.target.value, i);
  };

  return (
    <>
      <div
        className="modal fade"
        id="modalCart"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="modalTitle"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 id="modalTitle" className="modal-title">
                Carrito de compras
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body cart-controller">
              <div className="card">
                <ul className="list-group list-group-flush">
                  {props.cart.products.map((list, i) => {
                    return (
                      <li key={i} className="list-group-item">
                        <div className="row justify-content-md-center align-items-center">
                          <div className="col-md-3 d-none d-lg-block">
                            <img
                              src={list.url}
                              alt="imgProduct"
                              className="img-thumbnail mr-2 img-cart"
                            />
                          </div>
                          <div className="col-lg-4 col-12">
                            <h4>{list.product.name}</h4>
                          </div>
                          <div className="col-lg-2 col-4" align="center">
                            <input
                              className="form-control w-75"
                              min="1"
                              type="number"
                              value={list.amount}
                              onChange={(ref) => changeAmount(ref, i)}
                            />
                          </div>
                          <div className="col-lg-2 col-5 text-center">
                            <h4>
                              $
                              {list.product.discount
                                ? ((list.product.price *
                                    (100 - list.product.discount)) /
                                    100) *
                                  list.amount
                                : list.product.price * list.amount}
                            </h4>
                          </div>
                          <div className="col-lg-1 col-3">
                            <button
                              className="btn btn-danger ml-2"
                              onClick={() => props.deleteProduct(i)}
                            >
                              X
                            </button>
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
            <div className="modal-footer">
              <h4>Total a pagar ${props.cart.totalAmount}</h4>
              <a
                href={`https://wa.me/${number}?text=${getOrder()}`}
                target="blank_"
              >
                <button className="btn btn-whatsapp">
                  <i className="fab fa-whatsapp mr-2"></i>
                  Realizar pedido
                </button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ modifyProduct }, dispatch);
};

export default connect(null, mapDispatchToProps)(ListCart);
