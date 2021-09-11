import React, { useState } from "react";
import firebase from "firebase/app";
import "../styles/table-products.css";
import Swal from "sweetalert2";
import ProfileImg from "../images/default.jpg";
import ModalProduct from "./modal-product";
import { useStoreState } from "easy-peasy";
import { useEffect } from "react";

function TableProduct(props) {
  const [url, setUrl] = useState([ProfileImg]);
  const [image, setImage] = useState([]);
  const [uploadValue, setUploadValue] = useState(0);
  const [phone, setPhone] = useState(0);
  const [productModify, setProductModify] = useState(null);
  const todos = useStoreState((state) => state.todos.items);

  const handleChange = (e) => {
    let firstFile = true;
    if (e.target.files.length > 0) {
      Array.from(e.target.files).forEach((file) => {
        if (file.type === "image/jpeg" || file.type === "image/png") {
          let urlCreated = URL.createObjectURL(file);
          console.log(url[0].match("default"));
          if (url[0].match("default") && firstFile) {
            setUrl([urlCreated]);
            let newImg = file;
            setImage([newImg]);
          } else {
            setUrl((url) => [...url, urlCreated]);
            let newImg = file;
            setImage((img) => [...img, newImg]);
          }
        } else {
          Swal.fire({
            icon: "error",
            title: "Formato incorrecto",
            text: "La imagen debe estar en formato JPEG o PNG.",
            confirmButtonText: "Entendido",
          });
        }
        firstFile = false;
      });
    }
  };

  const uploadNewProduct = () => {
    let newCategory = document
      .getElementById("inputCategoria")
      .value.replace(/ /g, "");
    let newName = document.getElementById("inputNombre");
    let newDescription = document.getElementById("inputDescripcion");
    let newPrice = document.getElementById("inputPrecio");
    let newStock = document.getElementById("inputStock");
    var newImg = [];
    if (image.length > 0) {
      image.forEach((image) => {
        newImg.push(`images/${image.name}`);
      });
    } else {
      todos.forEach((item) => {
        if (Object.keys(item)[0] === "profilePath") {
          newImg[0] = Object.values(item)[0];
        }
      });
      setUploadValue(100);
    }
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
    if (image !== null && image[0] !== "images/default.jpg") {
      let percentage;
      image.forEach((image) => {
        if (typeof image !== "string") {
          const storageRef = firebase.storage().ref(`/images/${image.name}`);
          const task = storageRef.put(image);
          task.on(
            "state_changed",
            (snapshot) => {
              percentage +=
                ((snapshot.bytesTransferred / snapshot.totalBytes) * 100) /
                image.length;
              setUploadValue(Math.round(percentage));
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

  const searchDefaultImage = () => {
    let finded = false;
    todos.forEach((item) => {
      if (Object.keys(item)[0] === "profileImg") {
        setUrl([Object.values(item)[0]]);
        finded = true;
      }
    });
    if (!finded) {
      setUrl([ProfileImg]);
    }
  };

  const cleanModal = () => {
    setProductModify(null);
    setUploadValue(0);
    setImage([]);
    searchDefaultImage();
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
    setUrl([ProfileImg]);
    setProductModify(item);
    document.getElementById("progressBar").classList.add("progress-modify");
    let imgPath = item.val().img;
    setImage(item.val().img);
    let category = document.getElementById("inputCategoria");
    let name = document.getElementById("inputNombre");
    let desc = document.getElementById("inputDescripcion");
    let price = document.getElementById("inputPrecio");
    let stock = document.getElementById("inputStock");
    let itemCategory = item.val().category;

    if (imgPath[0].substring(imgPath[0].indexOf("/") + 1) !== "default.jpg") {
      //Get product img from DB
      var first = true;
      imgPath.forEach((imgUrl, i) => {
        if (first) {
          setUrl([
            "https://storage.googleapis.com/thefatmonkey-ecommerce.appspot.com/" +
              imgUrl,
          ]);
          first = false;
        } else {
          setUrl((stateUrl) => [
            ...stateUrl,
            "https://storage.googleapis.com/thefatmonkey-ecommerce.appspot.com/" +
              imgUrl,
          ]);
        }
        // }
        // firebase
        //   .storage()
        //   .ref(imgUrl)
        //   .getDownloadURL()
        //   .then((url) => {
        //     if (first) {
        //       setUrl([url]);
        //       first = false;
        //     } else {
        //       setUrl((stateUrl) => [...stateUrl, url]);
        //     }
        //   })
        //   .catch((error) => {
        //     console.log(error.message);
        //   });
        // setUrl(url.slice(0));
      });
    } else {
      searchDefaultImage();
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
    let newCategory = document
      .getElementById("inputCategoria")
      .value.replace(/ /g, "");
    let newName = document.getElementById("inputNombre");
    let newDescription = document.getElementById("inputDescripcion");
    let newPrice = document.getElementById("inputPrecio");
    let newStock = document.getElementById("inputStock");
    var newImg = [];
    if (image.length > 0) {
      image.forEach((image) => {
        if (typeof image !== "string") {
          newImg.push(`images/${image.name}`);
        } else {
          newImg.push(image);
        }
      });
    } else {
      newImg[0] = "images/default.jpg";
      setUploadValue(100);
    }

    if (newCategory.toLowerCase() !== productModify.val().category) {
      firebase
        .database()
        .ref()
        .child(
          "/products/" + productModify.val().category + "/" + productModify.key
        )
        .remove();
    }
    const dbRef = firebase
      .database()
      .ref()
      .child(
        "/products/" + newCategory.toLowerCase() + "/" + productModify.key
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
        }).then(() => {
          setUploadValue(0);
        });
      }
    );
  };

  const deleteProduct = (e, item) => {
    Swal.fire({
      icon: "warning",
      title: "¿Deseas eliminar este producto?",
      text: "Una vez eliminado, en caso de requerirlo deberás volver a cargarlo",
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

  const deleteImage = (index) => {
    let imageToDelete = image;
    let urlToDelete = url;
    urlToDelete.splice(index, 1);
    imageToDelete.splice(index, 1);
    if (imageToDelete.length > 0 && urlToDelete.length > 0) {
      setImage(imageToDelete);
      setUrl(urlToDelete);
    } else {
      let finded = false;
      setImage([]);
      todos.forEach((item) => {
        if (Object.keys(item)[0] === "profileImg") {
          setUrl([Object.values(item)[0]]);
          finded = true;
        }
      });
      if (!finded) {
        setUrl([ProfileImg]);
      }
    }
  };

  const updateDefaultImage = (e) => {
    if (e.target.files.length > 0) {
      if (
        e.target.files[0].type === "image/jpeg" ||
        e.target.files[0].type === "image/png"
      ) {
        let urlCreated = URL.createObjectURL(e.target.files[0]);
        let defaultImg = e.target.files[0];
        Swal.fire({
          title: "Confirmar cambio",
          text: "¿Desea cambiar la foto por defecto por la imagen seleccionada?",
          imageUrl: urlCreated,
          imageWidth: 300,
          imageHeight: 300,
          imageAlt: "Default image",
          confirmButtonText: "Confirmar",
        }).then((response) => {
          if (response.value) {
            const storageRef = firebase
              .storage()
              .ref(`/images/${defaultImg.name}`);
            storageRef.put(defaultImg).then(() => {
              firebase
                .database()
                .ref()
                .update({ profileImg: `/images/${defaultImg.name}` });
              Swal.fire({
                toast: true,
                timerProgressBar: true,
                timer: 3000,
                position: "bottom-end",
                icon: "success",
                title: "Imagen cambiada",
                confirmButtonText: "Continuar",
              });
            });
          } else {
            document.getElementById("inputDefaultImage").value = "";
          }
        });
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

  const changePhoneNumber = () => {
    Swal.fire({
      title: "Nuevo número de whatsapp",
      text: "Ingrese el nuevo número donde recibir pedidos.",
      footer: `N° actual: ${phone}`,
      input: "text",
      inputPlaceholder: "5411XXXXXXXX",
      confirmButtonText: "Confirmar",
      inputValidator: (value) => {
        if (!value) {
          return "No has ingresado ningún número!";
        }
      },
    }).then((response) => {
      if (response.value) {
        firebase
          .database()
          .ref()
          .update({ phoneNumber: response.value })
          .then(() => {
            Swal.fire({
              toast: true,
              timerProgressBar: true,
              timer: 3000,
              position: "bottom-end",
              icon: "success",
              title: "Número actualizado",
              confirmButtonText: "Continuar",
            });
          });
      }
    });
  };

  useEffect(() => {
    firebase
      .database()
      .ref("phoneNumber")
      .on("value", (snapshot) => {
        setPhone(snapshot.val());
      });
  }, []);

  useEffect(() => {
    let finded = false;
    todos.forEach((item) => {
      if (Object.keys(item)[0] === "profileImg") {
        setUrl([Object.values(item)[0]]);
        finded = true;
      }
    });
    if (!finded) {
      setUrl([ProfileImg]);
    }
  }, [todos]);

  return (
    <>
      <input
        id="inputDefaultImage"
        type="file"
        hidden
        onChange={(ref) => updateDefaultImage(ref)}
      ></input>
      <div className="float-left">
        <button
          className="btn btn-pink my-2 mr-2"
          onClick={() => document.getElementById("inputDefaultImage").click()}
        >
          Cambiar imagen por defecto
        </button>
        <button className="btn btn-pink" onClick={() => changePhoneNumber()}>
          Cambiar número de whatsapp
        </button>
        {/* <div className="ml-2 custom-control custom-switch">
          <input
            type="checkbox"
            className="custom-control-input"
            id="switchIgProfile"
            onChange={(ref) => changeIgProfileState(ref)}
          />
          <label className="custom-control-label" htmlFor="switchIgProfile">
            Usar imagen por defecto de Instagram
          </label>
        </div> */}
      </div>
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
      <div className="table-responsive">
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
      </div>
      <ModalProduct
        images={image}
        categories={props.categories}
        url={url}
        upload={(ref) => checkModal(ref)}
        uploadValue={uploadValue}
        handleChange={(ref) => handleChange(ref)}
        deleteImage={(index) => deleteImage(index)}
      />
    </>
  );
}

export default TableProduct;
