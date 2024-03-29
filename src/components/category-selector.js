import React, { useState, useEffect, useRef } from "react";
import CardCategory from "./card-category";
import firebase from "firebase/app";
import Loading from "./loading";

function CategorySelector(props) {
  const [categories, setCategories] = useState([]);
  const [urlImg, setUrlImg] = useState([]);
  const [show, setShow] = useState(false);
  const mountedRef = useRef(true);

  useEffect(() => {
    function getCategories() {
      const db = firebase.database();
      const dbRef = db.ref("products");
      dbRef.once("value", (snapshot) => {
        if (mountedRef.current) {
          const categories = Object.values(snapshot.val());
          const categoriesNames = Object.keys(snapshot.val());
          const categoryImages = [];
          categories.forEach((category) => {
            categoryImages.push(Object.values(category)[0].img[0]);
          });
          setCategories((prevCat) => [...prevCat, ...categoriesNames]);
          setUrlImg((url) => [...url, ...categoryImages]);
          setShow(true);
        }
      });
    }
    getCategories();
    return () => (mountedRef.current = false);
  }, []);

  const handleSelect = (cat) => {
    props.handleSelect(cat);
  };

  return (
    <div className="container">
      <div className="text-center">
        <h2 className="mt-2">Categorias</h2>
      </div>
      {!show && <Loading />}
      <div className="mt-4" style={show ? {} : { display: "none" }}>
        <div className="row row-cols-1 row-cols-sm-1 row-cols-md-3 row-cols-lg-4 justify-content-center">
          <div className="col mb-2">
            <CardCategory
              url={undefined}
              select={() => handleSelect("")}
              category="Todas"
            />
          </div>
          {categories.map((cat, i) => {
            return (
              <div className="col mb-2" key={i}>
                <CardCategory
                  url={urlImg[i]}
                  select={() => handleSelect(cat)}
                  category={cat}
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
