import React, { useState, useEffect } from "react";
import CardCategory from "./card-category";
import firebase from "firebase/app";

function CategorySelector(props) {
  const [categories, setCategories] = useState([]);
  const [urlImg, setUrlImg] = useState([]);

  useEffect(() => {
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
  }, []);

  const handleSelect = (cat) => {
    props.handleSelect(cat);
  };

  return (
    <div className="container">
      <div className="text-center">
        <h2>Categorias</h2>
      </div>
      <div className="card-deck">
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
