import React, { useState, useEffect } from "react";
import "../styles/image-selector.css";

function ImageSelector(props) {
  const [actualImages, setActualImages] = useState(null);
  const [handleChange, setHandleChange] = useState(0);

  useEffect(() => {
    setActualImages(props.images);
  }, [props, handleChange]);

  const deleteTest = (i) => {
    setHandleChange(handleChange + 1);
    props.delete(i);
  };

  return (
    <div
      style={
        props.show ? { display: "block", height: "446px" } : { display: "none" }
      }
    >
      <p onClick={props.back}> Volver </p>
      {actualImages !== null &&
        actualImages.map((img, i) => {
          if (typeof img === "string") {
            return (
              <div key={i} className="row mb-2 row-images">
                <div className="col">{img}</div>
                <div className="col">TESTIMGDATA</div>
                <div className="col">
                  <button
                    className="btn btn-pink"
                    onClick={() => deleteTest(i)}
                  >
                    X
                  </button>
                </div>
              </div>
            );
          } else {
            return (
              <div key={i} className="row">
                <div className="col">{Object.values(img).name}</div>
                <div className="col">TESTIMGDATA</div>
                <div className="col">
                  <button onClick={() => deleteTest(i)}>X</button>
                </div>
              </div>
            );
          }
        })}
    </div>
  );
}

export default ImageSelector;
