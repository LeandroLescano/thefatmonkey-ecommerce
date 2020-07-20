import React from "react";
import firebase from "firebase/app";
import "../styles/table-products.css";
import Swal from "sweetalert2";

function TableProduct(props) {
  const changeStateProduct = (e, item) => {
    const dbRef = firebase
      .database()
      .ref()
      .child("/products/" + item.val().category + "/" + item.key);
    if (e.target.innerHTML === "Deshabilitar") {
      dbRef.update({ state: 0 });
    } else {
      dbRef.update({ state: 1 });
    }
  };

  const deleteProduct = (e, item) => {
    Swal.fire({
      icon: "warning",
      title: "¿Deseas eliminar este producto?",
      text:
        "Una vez eliminado, en caso de requerirlo deberás volver a cargarlo",
      showCancelButton: true,
      reverseButtons: true,
      cancelButtonText: "Cancelar",
      confirmButtonText: "Eliminar",
    }).then((result) => {
      if (result.value) {
        firebase
          .database()
          .ref()
          .child("/products/" + item.val().category + "/" + item.key)
          .remove();
      }
    });
  };

  return (
    <table className="table" style={{ overflowX: "scroll" }}>
      <thead>
        <tr>
          <th scope="col">Nro.</th>
          <th scope="col">Nombre</th>
          <th scope="col">Descripcion</th>
          <th scope="col">Precio</th>
          <th scope="col">Stock</th>
          <th scope="col col-state">Estado</th>
          <th scope="col">Eliminar</th>
        </tr>
      </thead>
      <tbody>
        {props.productos.map((item, i) => {
          return (
            <tr key={i}>
              <th scope="row">{i + 1}</th>
              <td>{item.val().name}</td>
              <td>{item.val().description}</td>
              <td>${item.val().price}</td>
              <td>{item.val().stock}</td>
              <td>
                <button
                  className="btn btn-pink"
                  onClick={(ref) => changeStateProduct(ref, item)}
                >
                  {item.val().state ? "Deshabilitar" : "Habilitar"}
                </button>
              </td>
              <td>
                <button
                  className="btn btn-pink"
                  onClick={(ref) => deleteProduct(ref, item)}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default TableProduct;
