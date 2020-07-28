import React, { useState, useEffect } from "react";

function ImageSelector(props) {
  const [actualImages, setActualImages] = useState(null);

  useEffect(() => {
    setActualImages(props.images);
  }, [props]);

  const deleteTest = (i) => {
    props.delete(i);
  };

  return (
    <div className="container">
      <p onClick={props.back}> Volver </p>
      {actualImages !== null &&
        actualImages.map((img, i) => {
          if (typeof img === "string") {
            return (
              <div key={i} className="row">
                <div className="col">{img}</div>
                <div className="col">TESTIMGDATA</div>
                <div className="col">
                  <button onClick={() => deleteTest(i)}>X</button>
                </div>
              </div>
            );
          } else {
            return (
              <div key={i} className="row">
                <div className="col">{Object.values(img)[0].name}</div>
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
