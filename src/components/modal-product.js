import React, { useEffect, useState } from "react";
import autocomplete from "./autocomplete.js";
import Loading from "../components/loading";
import Swal from "sweetalert2";

function ModalProduct(props) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    autocomplete(document.getElementById("inputCategoria"), props.categories);
    if (
      props.image !== null &&
      props.image.length > 0 &&
      typeof props.image[0] === "string"
    ) {
      if (props.image[0].includes("default")) {
        setLoading(false);
      }
    }
  }, [props]);

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
                        className="btn btn-pink mr-2 mb-2"
                        onClick={() =>
                          document.getElementById("inputImage").click()
                        }
                      >
                        Seleccionar imagen
                      </button>
                      {props.image !== null &&
                        !props.url[0].includes("default") && (
                          <>
                            <button
                              type="button"
                              className="btn btn-pink mb-2"
                              onClick={() =>
                                document.getElementById("inputImage").click()
                              }
                            >
                              Agregar
                            </button>
                            <button type="button" className="btn btn-pink">
                              Ver imagenes
                            </button>
                          </>
                        )}
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
                    {loading && <Loading />}
                    <img
                      style={loading ? { display: "none" } : {}}
                      onLoad={() => setLoading(false)}
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
