import React, { useState, useEffect, useRef } from "react";
import CardCategory from "./card-category";
import firebase from "firebase/app";
import Loading from "./loading";

function CategorySelector(props) {
  const [categories, setCategories] = useState([]);
  const [urlImg, setUrlImg] = useState([]);
  const [count, setCount] = useState(1);
  const [show, setShow] = useState(false);
  const mountedRef = useRef(true);

  useEffect(() => {
    console.log(firebase.auth());
    if (mountedRef.current) {
      function getCategories() {
        const db = firebase.database();
        const dbRef = db.ref("products");
        dbRef.on("child_added", (snapshot) => {
          let categoryAct =
            snapshot.key.charAt(0).toUpperCase() + snapshot.key.slice(1);
          setCategories((categories) => [...categories, categoryAct]);
          setUrlImg((url) => [...url, Object.values(snapshot.val())[0].img[0]]);
        });
      }
      getCategories();
    }
    return () => (mountedRef.current = false);
  }, []);

  const handleSelect = (cat) => {
    props.handleSelect(cat);
  };

  const checkImages = () => {
    setCount(count + 1);
    if (categories.length === count) {
      console.log(categories.length, count);
      setShow(true);
    }
  };

  return (
    <div className="container">
      <div className="text-center">
        <h2 className="mt-2">Categorias</h2>
      </div>
      {!show && <Loading />}
      <div className="card-deck mt-4" style={show ? {} : { display: "none" }}>
        <div className="row row-cols-1 row-cols-sm-1 row-cols-md-3 row-cols-lg-4">
          <div className="col">
            <CardCategory
              url={undefined}
              select={() => handleSelect("")}
              category="Todas"
            />
          </div>
          {categories.map((cat, i) => {
            return (
              <div className="col" key={i}>
                <CardCategory
                  url={urlImg[i]}
                  select={() => handleSelect(cat)}
                  category={cat}
                  imgLoad={() => checkImages()}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default CategorySelector;
