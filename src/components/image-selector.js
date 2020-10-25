import React, { useState, useEffect } from "react";
import "../styles/image-selector.css";

function ImageSelector(props) {
  const [actualImages, setActualImages] = useState(null);
  const [handleChange, setHandleChange] = useState(0);

  useEffect(() => {
    setActualImages(props.images);
  }, [props, handleChange]);

  const deleteImage = (i) => {
    setHandleChange(handleChange + 1);
    props.delete(i);
  };

  return (
    <div
      className="image-controller"
      style={
        props.show
          ? { display: "block", minHeight: "446px" }
          : { display: "none" }
      }
    >
      <div className="row">
        <div className="col">
          <p onClick={props.back} className="btn btn-pink">
            ← Volver
          </p>
        </div>
        <div className="col text-right">
          <p className="btn btn-pink" onClick={props.add}>
            Agregar
          </p>
        </div>
      </div>
      <div className="row row-cols-1 row-cols-md-3">
        {actualImages !== null &&
          actualImages.map((img, i) => {
            if (typeof img === "string") {
              return (
                <div key={i} className="col mb-2">
                  <div className="card">
                    <img
                      className="card-img-top img-fluid"
                      src={props.url[i]}
                      alt="ProductImg"
                      width="150"
                      height="150"
                    ></img>
                    <div className="card-body text-right">
                      <button
                        className="btn btn-pink"
                        onClick={() => deleteImage(i)}
                      >
                        Eliminar
                      </button>
                    </div>
                  </div>
                </div>
              );
            } else {
              return (
                <div key={i} className="col mb-2">
                  <div className="card">
                    {" "}
                    <img
                      className="card-img-top img-fluid"
                      src={props.url[i]}
                      alt="ProductImg"
                      width="150"
                      height="150"
                    ></img>
                    <div className="card-body text-right">
                      <button
                        className="btn btn-pink"
                        onClick={() => deleteImage(i)}
                      >
                        Eliminar
                      </button>
                    </div>
                  </div>
                </div>
              );
            }
          })}
      </div>
    </div>
  );
}

export default ImageSelector;
