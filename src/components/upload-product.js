import React, { useState } from "react";
import firebase from "firebase/app";
import Swal from "sweetalert2";

function UploadProduct(props) {
  const [url, setUrl] = useState(
    "https://dummyimage.com/200x200/575657/000000.jpg"
  );
  const [image, setImage] = useState(null);
  const [uploadValue, setUploadValue] = useState(0);

  const handleChange = (e) => {
    setUrl(URL.createObjectURL(e.target.files[0]));
    let nameFile = e.target.value.substr(12);
    if (e.target.files.length > 0) {
      setImage(e.target.files[0]);
    }
  };

  const uploadNewProduct = () => {
    let category = document.getElementById("inputCategory").selectedOptions[0]
      .innerHTML;
    let newName = document.getElementById("inputNombre");
    let newDescription = document.getElementById("inputDescripcion");
    let newPrice = document.getElementById("inputPrecio");
    let newStock = document.getElementById("inputStock");
    let newImg = `images/${image.name}`;

    const product = {
      name: newName.value,
      description: newDescription.value,
      price: newPrice.value,
      stock: newStock.value,
      img: newImg,
    };
    const db = firebase.database();
    const dbRef = db.ref("products/" + category.toLowerCase());
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
      props.new();
      setUploadValue(0);
      setImage(null);
      setUrl("https://dummyimage.com/200x200/575657/000000.jpg");
      cleanModal();
    });
  };

  const cleanModal = () => {
    document.getElementById("inputCategory").value = "0";
    document.getElementById("inputNombre").value = "";
    document.getElementById("inputDescripcion").value = "";
    document.getElementById("inputPrecio").value = "";
    document.getElementById("inputStock").value = "";
  };

  const subirArchivo = () => {
    const storageRef = firebase.storage().ref(`/images/${image.name}`);
    const task = storageRef.put(image);
    task.on(
      "state_changed",
      (snapshot) => {
        let percentage =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadValue(Math.round(percentage));
        console.log(percentage);
      },
      (error) => {
        console.log(error.message);
      },
      () => {
        setUploadValue(100);
        uploadNewProduct();
      }
    );
  };
  return (
    <>
      <button
        className="btn btn-pink my-2"
        data-toggle="modal"
        data-target="#modalProduct"
      >
        Nuevo producto
      </button>
      <div
        className="modal fade"
        id="modalProduct"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="modalProductLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="modalProductLabel">
                Nuevo producto
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form>
                <div className="row">
                  <div className="col-6">
                    {" "}
                    <div className="form-group">
                      <label htmlFor="inputCategoria">Categoría</label>
                      <select className="custom-select" id="inputCategory">
                        <option selectedvalue="true">Seleccionar...</option>
                        <option value="1">Hornos</option>
                        <option value="2">Macetas</option>
                        <option value="3">Tazas</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="form-group">
                      <label htmlFor="inputNombre">Nombre</label>
                      <input
                        type="text"
                        className="form-control"
                        id="inputNombre"
                      />
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="inputDescripcion">Descripción</label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputDescripcion"
                  />
                </div>
                <div className="row">
                  <div className="col-6">
                    <div className="form-group">
                      <label htmlFor="inputPrecio">Precio</label>
                      <div className="input-group">
                        <div className="input-group-prepend">
                          <span className="input-group-text">$</span>
                        </div>
                        <input
                          type="text"
                          id="inputPrecio"
                          className="form-control rounded-right"
                          required
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <label htmlFor="inputStock">Stock</label>
                      <div className="input-group">
                        <input
                          type="text"
                          id="inputStock"
                          className="form-control"
                          required
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <div className="input-group">
                        <button
                          type="button"
                          className="btn btn-pink"
                          onClick={() =>
                            document.getElementById("inputImage").click()
                          }
                        >
                          Seleccionar imagen
                        </button>
                      </div>
                      <input
                        id="inputImage"
                        type="file"
                        hidden
                        onChange={(ref) => handleChange(ref)}
                      ></input>
                    </div>
                  </div>
                  <div className="col-6">
                    <label className="float-left">Previsualización</label>
                    <div className="input-group justify-content-center">
                      <img
                        src={url}
                        className="img-fluid img-prev"
                        height="200"
                        width="200"
                        alt="previewProduct"
                      />
                    </div>
                  </div>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <div className="progress">
                <div
                  className="progress-bar"
                  role="progressbar"
                  style={{ width: uploadValue + "%" }}
                  aria-valuenow={uploadValue}
                  aria-valuemin="0"
                  aria-valuemax="100"
                >
                  {uploadValue}%
                </div>
              </div>
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                Cerrar
              </button>
              <button
                type="button"
                className="btn btn-pink"
                onClick={() => subirArchivo()}
              >
                Cargar
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default UploadProduct;