import React from "react";
import "../styles/carousel-product.css";

function CarouselProduct(props) {
  return (
    <div className="carousel-container align-middle text-center">
      <div id="carouselProduct" className="carousel slide" data-ride="carousel">
        <ol class="carousel-indicators">
          <li
            data-target="#carouselExampleIndicators"
            data-slide-to="0"
            class="active"
          ></li>
        </ol>
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img src={props.url} className="img-fluid" alt="..." />
          </div>
          {/* <div className="carousel-item">
            <img src={props.url} className="img-fluid" alt="..." />
          </div> */}
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
