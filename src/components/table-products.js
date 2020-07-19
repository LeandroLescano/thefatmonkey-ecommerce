import React from "react";

function TableProduct(props) {
  return (
    <table className="table">
      <thead>
        <tr>
          <th scope="col">Nro.</th>
          <th scope="col">Nombre</th>
          <th scope="col">Descripcion</th>
          <th scope="col">Precio</th>
          <th scope="col">Stock</th>
        </tr>
      </thead>
      <tbody>
        {props.productos.map((item, i) => {
          return (
            <tr key={i}>
              <th scope="row">{i + 1}</th>
              <td>{item.name}</td>
              <td>{item.description}</td>
              <td>${item.price}</td>
              <td>${item.stock}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default TableProduct;
