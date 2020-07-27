import React from "react";
import "../styles/carousel-product.css";

function CarouselProduct(props) {
  return (
    <div className="carousel-container align-middle text-center">
      <div id="carouselProduct" className="carousel slide" data-ride="carousel">
        <ol className="carousel-indicators">
          <li
            data-target="#carouselExampleIndicators"
            data-slide-to="0"
            className="active"
          ></li>
          {props.url.length > 1 &&
            props.url.slice(1).map((img, i) => {
              return (
                <li
                  key={i}
                  data-target="#carouselExampleIndicators"
                  data-slide-to="0"
                ></li>
              );
            })}
        </ol>
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img src={props.url[0]} className="img-fluid" alt="..." />
          </div>
          {props.url.length > 1 &&
            props.url.slice(1).map((img, i) => {
              return (
                <div key={i} className="carousel-item">
                  <img src={img} className="img-fluid" alt="..." />
                </div>
              );
            })}
        </div>
        <a
          className="carousel-control-prev"
          href="#carouselProduct"
          role="button"
          data-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="sr-only">Previous</span>
        </a>
        <a
          className="carousel-control-next"
          href="#carouselProduct"
          role="button"
          data-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="sr-only">Next</span>
        </a>
      </div>
    </div>
  );
}

export default CarouselProduct;
