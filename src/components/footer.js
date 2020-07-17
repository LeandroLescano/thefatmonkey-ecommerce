import React from "react";
import "../styles/footer.css";

function Footer() {
  return (
    <React.Fragment>
      <footer>
        <div className="col-md-12 centrar">
          <p className="footer-copyright mb-2 pb-1 pt-2 text-center">
            &copy; {new Date().getFullYear()} Copyright: Lescano, Leandro
            Nicolas
          </p>
        </div>
      </footer>
    </React.Fragment>
  );
}

export default Footer;
