import React, { useState } from "react";
import firebase from "firebase/app";
import "../styles/table-products.css";
import Swal from "sweetalert2";
import ProfileImg from "../images/default.jpg";
import ModalProduct from "./modal-product";

function TableProduct(props) {
  const [url, setUrl] = useState([ProfileImg]);
  const [image, setImage] = useState([]);
  const [uploadValue, setUploadValue] = useState(0);
  const [productModify, setProductModify] = useState(null);

  const handleChange = (e) => {
    if (e.target.files.length > 0) {
      if (
        e.target.files[0].type === "image/jpeg" ||
        e.target.files[0].type === "image.png"
      ) {
        setUrl(URL.createObjectURL(e.target.files[0]));
        if (e.target.files.length > 0) {
          let newImg = e.target.files[0];
          setImage((image) => [...image, { newImg }]);
        }
        console.log(image);
      } else {
        Swal.fire({
          icon: "error",
          title: "Formato incorrecto",
          text: "La imagen debe estar en formato JPEG o PNG.",
          confirmButtonText: "Entendido",
        });
      }
    }
  };

  const uploadNewProduct = () => {
    let newCategory = document.getElementById("inputCategoria").value;
    let newName = document.getElementById("inputNombre");
    let newDescription = document.getElementById("inputDescripcion");
    let newPrice = document.getElementById("inputPrecio");
    let newStock = document.getElementById("inputStock");
    var newImg = [];
    if (image.length > 0) {
      image.forEach((image) => {
        newImg.push(`images/${Object.values(image)[0].name}`);
      });
    } else {
      newImg[0] = "images/default.jpg";
      setUploadValue(100);
    }
    console.log(newImg);
    const product = {
      category: newCategory.toLowerCase(),
      name: newName.value,
      description: newDescription.value,
      price: newPrice.value,
      stock: newStock.value,
      img: newImg,
      state: 1,
    };
    const db = firebase.database();
    const dbRef = db.ref("products/" + newCategory.toLowerCase());
    console.log("products/" + newCategory.toLowerCase());
    const newProduct = dbRef.push();
    newProduct.set(product);
    Swal.fire({
      toast: true,
      timerProgressBar: true,
      timer: 3000,
      position: "bottom-end",
      icon: "success",
      title: "Producto añadido",
      confirmButtonText: "Continuar",
    }).then(() => {
      cleanModal();
    });
  };

  const subirArchivo = (type) => {
    if (image !== null && Object.values(image)[0] !== "images/default.jpg") {
      let percentage;
      console.log(image);
      image.forEach((image) => {
        if (typeof image !== "string") {
          const storageRef = firebase
            .storage()
            .ref(`/images/${Object.values(image)[0]}`);
          const task = storageRef.put(Object.values(image)[0]);
          task.on(
            "state_changed",
            (snapshot) => {
              percentage +=
                ((snapshot.bytesTransferred / snapshot.totalBytes) * 100) /
                image.length;
              setUploadValue(Math.round(percentage));
              console.log(percentage);
            },
            (error) => {
              console.log(error.message);
            }
          );
        }
      });
      setUploadValue(100);
      if (type === "Cargar") {
        uploadNewProduct();
      } else {
        modifyProduct();
      }
    } else {
      if (type === "Cargar") {
        uploadNewProduct();
      } else {
        modifyProduct();
      }
    }
  };

  const checkModal = (ref, item) => {
    let modalComplete = true;
    let inputs = [
      document.getElementById("inputCategoria"),
      document.getElementById("inputNombre"),
      document.getElementById("inputDescripcion"),
      document.getElementById("inputPrecio"),
      document.getElementById("inputStock"),
    ];
    inputs.forEach((input) => {
      if (input.value === "") {
        Swal.fire({
          icon: "warning",
          title:
            "Todos los campos deben estar completos para cargar el producto!",
        });
        modalComplete = false;
      }
    });

    if (modalComplete) {
      if (ref.target.innerHTML === "Cargar") {
        subirArchivo("Cargar");
      } else {
        subirArchivo("Modificar");
      }
    }
  };

  const cleanModal = () => {
    setProductModify(null);
    setUploadValue(0);
    setImage([]);
    setUrl([ProfileImg]);
    document.getElementById("inputCategoria").value = "";
    document.getElementById("inputNombre").value = "";
    document.getElementById("inputDescripcion").value = "";
    document.getElementById("inputPrecio").value = "";
    document.getElementById("inputStock").value = "";
    document.getElementById("btnSubmit").innerHTML = "Cargar";
    document.getElementById("modalTitle").innerHTML = "Nuevo producto";
    document.getElementById("progressBar").classList.remove("progress-modify");
  };

  const changeStateProduct = (e, item) => {
    const dbRef = firebase
      .database()
      .ref()
      .child("/products/" + item.val().category + "/" + item.key);
    if (e.target.innerHTML === "Deshabilitar") {
      dbRef.update({ state: 0 });
    } else {
      dbRef.update({ state: 1 });
    }
  };

  const fillModal = (e, item) => {
    setProductModify(item);
    document.getElementById("progressBar").classList.add("progress-modify");
    let imgPath = item.val().img[0];
    setImage(item.val().img);
    let category = document.getElementById("inputCategoria");
    let name = document.getElementById("inputNombre");
    let desc = document.getElementById("inputDescripcion");
    let price = document.getElementById("inputPrecio");
    let stock = document.getElementById("inputStock");
    let itemCategory = item.val().category;

    if (imgPath.substring(imgPath.indexOf("/") + 1) !== "default.jpg") {
      //Get product img from DB
      firebase
        .storage()
        .ref(imgPath)
        .getDownloadURL()
        .then((url) => {
          setUrl([url]);
        })
        .catch((error) => {
          console.log(error.message);
        });
    } else {
      setUrl([ProfileImg]);
    }
    category.value =
      itemCategory.charAt(0).toUpperCase() + itemCategory.slice(1);
    name.value = item.val().name;
    desc.value = item.val().description;
    price.value = item.val().price;
    stock.value = item.val().stock;
    document.getElementById("btnSubmit").innerHTML = "Modificar";
    document.getElementById("modalTitle").innerHTML = "Modificar producto";
  };

  const modifyProduct = () => {
    let newCategory = document.getElementById("inputCategoria").value;
    let newName = document.getElementById("inputNombre");
    let newDescription = document.getElementById("inputDescripcion");
    let newPrice = document.getElementById("inputPrecio");
    let newStock = document.getElementById("inputStock");
    var newImg = [];
    if (image.length > 0) {
      image.forEach((image) => {
        if (typeof image !== "string") {
          newImg.push(`images/${Object.values(image)[0].name}`);
        } else {
          newImg.push(image);
        }
      });
    } else {
      newImg[0] = "images/default.jpg";
      setUploadValue(100);
    }

    const dbRef = firebase
      .database()
      .ref()
      .child(
        "/products/" + productModify.val().category + "/" + productModify.key
      );
    dbRef.update(
      {
        category: newCategory.toLowerCase(),
        name: newName.value,
        description: newDescription.value,
        price: newPrice.value,
        stock: newStock.value,
        img: newImg,
        state: 1,
      },
      () => {
        Swal.fire({
          toast: true,
          position: "bottom-end",
          icon: "success",
          title: "Producto modificado",
          timer: 3000,
          timerProgressBar: true,
        });
        if (uploadValue < 100) {
          setUploadValue(100);
          setTimeout(() => {
            cleanModal();
          }, 3000);
        }
      }
    );
  };

  const deleteProduct = (e, item) => {
    Swal.fire({
      icon: "warning",
      title: "¿Deseas eliminar este producto?",
      text:
        "Una vez eliminado, en caso de requerirlo deberás volver a cargarlo",
      showCancelButton: true,
      reverseButtons: true,
      cancelButtonText: "Cancelar",
      confirmButtonText: "Eliminar",
    }).then((result) => {
      if (result.value) {
        firebase
          .database()
          .ref()
          .child("/products/" + item.val().category + "/" + item.key)
          .remove();
      }
    });
  };

  return (
    <>
      <div className="float-right">
        <button
          className="btn btn-pink my-2"
          data-toggle="modal"
          data-target="#modalProduct"
          onClick={() => cleanModal()}
        >
          Nuevo producto
        </button>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Nro.</th>
            <th scope="col">Nombre</th>
            <th scope="col">Descripcion</th>
            <th scope="col">Precio</th>
            <th scope="col">Stock</th>
            <th scope="col">Modificar</th>
            <th scope="col col-state">Estado</th>
            <th scope="col">Eliminar</th>
          </tr>
        </thead>
        <tbody>
          {props.productos.map((item, i) => {
            return (
              <tr key={i}>
                <th scope="row">{i + 1}</th>
                <td>{item.val().name}</td>
                <td className="text-description-table">
                  {item.val().description}
                </td>
                <td>${item.val().price}</td>
                <td>{item.val().stock}</td>
                <td>
                  <button
                    data-toggle="modal"
                    data-target="#modalProduct"
                    className="btn btn-pink"
                    onClick={(ref) => fillModal(ref, item)}
                  >
                    Modificar
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-pink"
                    onClick={(ref) => changeStateProduct(ref, item)}
                  >
                    {item.val().state ? "Deshabilitar" : "Habilitar"}
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-pink"
                    onClick={(ref) => deleteProduct(ref, item)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <ModalProduct
        image={image}
        categories={props.categories}
        url={url}
        upload={(ref) => checkModal(ref)}
        uploadValue={uploadValue}
        handleChange={(ref) => handleChange(ref)}
      />
    </>
  );
}

export default TableProduct;
