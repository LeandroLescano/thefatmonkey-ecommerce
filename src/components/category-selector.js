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
        <CardCategory
          url={undefined}
          select={() => handleSelect("")}
          category="Todas"
        />
        {categories.map((cat, i) => {
          return (
            <CardCategory
              url={urlImg[i]}
              select={() => handleSelect(cat)}
              key={i}
              category={cat}
            />
          );
        })}
      </div>
    </div>
  );
}

export default CategorySelector;
