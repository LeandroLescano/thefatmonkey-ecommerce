import React, { useEffect, useState } from "react";
import ProfileImg from "../images/default.jpg";
import "../styles/card-category.css";
import firebase from "firebase/app";

function CardCategory(props) {
  const [url, setUrl] = useState(ProfileImg);

  useEffect(() => {
    if (props.url !== undefined) {
      let referencia = props.url;
      let mounted = true;
      firebase
        .storage()
        .ref(referencia)
        .getDownloadURL()
        .then((url) => {
          if (mounted) {
            setUrl(url);
          }
        })
        .catch((error) => {
          console.log(error.message);
        });
      return () => (mounted = false);
    }
  }, [props.url]);

  return (
    <>
      <div className="card card-category mb-2" onClick={props.select}>
        <div id="card-content-wrapper" className="row no-gutters">
          <div className="col-auto img-category">
            <img src={url} alt="categoryImg" className="img-fluid" />
          </div>
          <div className="col col-category m-auto">
            <div className="card-body text-center">
              <h5 className="card-title">{props.category}</h5>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CardCategory;
