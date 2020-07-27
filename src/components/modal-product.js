import React, { useEffect } from "react";
import autocomplete from "./autocomplete.js";
import $ from "jquery";

function ModalProduct(props) {
  useEffect(() => {
    autocomplete(document.getElementById("inputCategoria"), props.categories);
  }, [props]);

  $("#modalProduct").on("hidden.bs.modal", () => {
    document.getElementById("imgProduct").src = props.url;
    document.getElementById("btnSubmit").innerHTML = "Cargar";
    document.getElementById("modalTitle").innerHTML = "Nuevo producto";
    document.getElementById("progressBar").classList.remove("progress-modify");
  });

  return (
    <div
      className="modal fade"
      id="modalProduct"
      tabIndex="-1"
      role="dialog"
      aria-labelledby="modalTitle"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 id="modalTitle" className="modal-title">
              Nuevo producto
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
          <div className="modal-body">
            <form>
              <div className="row">
                <div className="col-6">
                  {" "}
                  <div className="form-group">
                    <label htmlFor="inputCategoria">Categoría</label>
                    <div className="autocomplete">
                      <input
                        className="form-control"
                        type="text"
                        id="inputCategoria"
                        placeholder="Categoría..."
                      />
                    </div>
                  </div>
                </div>
                <div className="col-6">
                  <div className="form-group">
                    <label htmlFor="inputNombre">Nombre</label>
                    <input
                      type="text"
                      className="form-control"
                      id="inputNombre"
                    />
                  </div>
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="inputDescripcion">Descripción</label>
                <input
                  type="text"
                  className="form-control"
                  id="inputDescripcion"
                />
              </div>
              <div className="row">
                <div className="col-6">
                  <div className="form-group">
                    <label htmlFor="inputPrecio">Precio</label>
                    <div className="input-group">
                      <div className="input-group-prepend">
                        <span className="input-group-text">$</span>
                      </div>
                      <input
                        type="text"
                        id="inputPrecio"
                        className="form-control rounded-right"
                        required
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="inputStock">Stock</label>
                    <div className="input-group">
                      <input
                        type="text"
                        id="inputStock"
                        className="form-control"
                        required
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="input-group">
                      <button
                        type="button"
                        className="btn btn-pink"
                        onClick={() =>
                          document.getElementById("inputImage").click()
                        }
                      >
                        Seleccionar imagen
                      </button>
                    </div>
                    <input
                      id="inputImage"
                      type="file"
                      hidden
                      onChange={(ref) => {
                        props.handleChange(ref);
                      }}
                    ></input>
                  </div>
                </div>
                <div className="col-6">
                  <label className="float-left">Previsualización</label>
                  <div className="input-group justify-content-center">
                    <img
                      src={props.url}
                      id="imgProduct"
                      className="img-fluid img-prev"
                      height="200"
                      width="200"
                      alt="previewProduct"
                    />
                  </div>
                </div>
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <div id="progressBar" className="progress">
              <div
                className="progress-bar"
                role="progressbar"
                style={{ width: props.uploadValue + "%" }}
                aria-valuenow={props.uploadValue}
                aria-valuemin="0"
                aria-valuemax="100"
              >
                {props.uploadValue}%
              </div>
            </div>
            <button
              type="button"
              className="btn btn-secondary"
              data-dismiss="modal"
            >
              Cerrar
            </button>
            <button
              id="btnSubmit"
              type="button"
              className="btn btn-pink"
              onClick={(ref) => props.upload(ref)}
            >
              Cargar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModalProduct;
