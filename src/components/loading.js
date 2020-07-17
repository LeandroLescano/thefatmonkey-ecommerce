import React from "react";
import "../styles/loading.css";

function Loading() {
  return (
    <React.Fragment>
      <div className="text-center">
        <div className="col-md-12 mt-5 mb-5 centrar">
          <svg
            className="spinner"
            width="65px"
            height="65px"
            viewBox="0 0 66 66"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              className="circle"
              fill="none"
              strokeWidth="6"
              strokeLinecap="round"
              cx="33"
              cy="33"
              r="30"
            ></circle>
          </svg>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Loading;
