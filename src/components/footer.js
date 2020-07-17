import React from "react";

function Footer() {
  return (
    <React.Fragment>
      <div className="row">
        <div className="col-md-12 centrar">
          <p className="footer-copyright mb-2 pb-1 pt-2 text-center">
            &copy; {new Date().getFullYear()} Copyright: Lescano, Leandro
            Nicolas
          </p>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Footer;
