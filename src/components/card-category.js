import React, { useEffect, useState } from "react";
import { useStoreState } from "easy-peasy";
import "../styles/card-category.css";

function CardCategory(props) {
  const [url, setUrl] = useState("");
  const [show, setShow] = useState(false);
  const todos = useStoreState((state) => state.todos.items);

  useEffect(() => {
    if (props.url !== undefined) {
      let referencia = props.url;
      let mounted = true;
      if (mounted) {
        setUrl(
          "https://storage.googleapis.com/thefatmonkey-ecommerce.appspot.com/" +
            referencia
        );
      }
      // firebase
      //   .storage()
      //   .ref(referencia)
      //   .getDownloadURL()
      //   .then((url) => {
      //     if (mounted) {
      //       setUrl(url);
      //     }
      //   })
      //   .catch((error) => {
      //     setUrl(ProfileImg);
      //     console.log(error.message);
      //   });
      return () => (mounted = false);
    }
    todos.forEach((item) => {
      if (Object.keys(item)[0] === "profileImg") {
        setUrl(Object.values(item)[0]);
      }
    });
  }, [props.url, todos]);

  return (
    <>
      {url !== "" && (
        <div className="card card-category mb-2" onClick={props.select}>
          <div id="card-content-wrapper" className="row no-gutters">
            <div className="col-auto img-category">
              {!show && (
                <div className={`loading-img ${!show ? "loading" : ""}`}></div>
              )}
              <img
                src={url}
                style={{ display: show ? "block" : "none" }}
                alt="categoryImg"
                className="img-fluid fluid-category"
                onLoad={() => {
                  setShow(true);
                }}
              />
            </div>
            <div className="col col-category m-auto">
              <div className="card-body text-center">
                <h5 className={`card-title ${!show ? "loading" : ""}`}>
                  {props.category.replace(/_/g, " ")}
                </h5>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default CardCategory;
