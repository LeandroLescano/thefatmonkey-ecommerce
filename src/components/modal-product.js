import React, { useEffect, useState } from "react";
import autocomplete from "./autocomplete.js";
import Loading from "../components/loading";
import ImageSelector from "./image-selector";

function ModalProduct(props) {
  const [loading, setLoading] = useState(true);
  const [tabImages, setTabImages] = useState(false);

  const deleteImage = (index) => {
    props.deleteImage(index);
  };

  useEffect(() => {
    if (props.images.length <= 0) {
      setTabImages(false);
    }
    if (!document.getElementById("imgProduct").complete) {
      setLoading(true);
    }
    autocomplete(document.getElementById("inputCategoria"), props.categories);
    if (
      props.images !== null &&
      props.images.length > 0 &&
      typeof props.images[0] === "string"
    ) {
      if (props.images[0].includes("default")) {
        setLoading(false);
      }
    }
  }, [props, props.images]);

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
            <ImageSelector
              url={props.url}
              show={tabImages}
              images={props.images}
              back={() => setTabImages(false)}
              delete={(index) => deleteImage(index)}
              add={() => document.getElementById("inputImage").click()}
            />
            <form
              style={tabImages ? { display: "none" } : { display: "block" }}
            >
              <div className="row">
                <div className="col-6">
                  {" "}
                  <div className="form-group">
                    <label htmlFor="inputCategoria">Categoría</label>
                    <div className="autocomplete">
                      <input
                        autoComplete="off"
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
                      {props.images !== null &&
                        props.url.length > 0 &&
                        props.images.length <= 0 && (
                          <button
                            type="button"
                            className="btn btn-pink mr-2 mb-2"
                            onClick={() =>
                              document.getElementById("inputImage").click()
                            }
                          >
                            Seleccionar imagen
                          </button>
                        )}
                      {props.images !== null && props.images.length > 0 && (
                        <>
                          <button
                            type="button"
                            className="btn btn-pink mr-2"
                            onClick={() =>
                              document.getElementById("inputImage").click()
                            }
                          >
                            Agregar
                          </button>
                          <button
                            type="button"
                            className="btn btn-pink clear-right"
                            onClick={() => setTabImages(true)}
                          >
                            Ver imagenes
                          </button>
                          <p className="mt-2">
                            Cantidad de imágenes: {props.images.length}
                          </p>
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
                      src={props.url[0]}
                      id="imgProduct"
                      className="img-fluid img-prev"
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
