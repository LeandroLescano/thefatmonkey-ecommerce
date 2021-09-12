import React from "react";
import "../styles/footer.css";

function Footer() {
  return (
    <React.Fragment>
      <footer className="footer">
        <div>
          <div className="clearfix p-1">
            <div id="loginContainer" className="float-left"></div>
            <div className="float-right">
              <a
                href="https://www.instagram.com/thefatmonkeydeco"
                target="_blank"
                rel="noopener noreferrer"
                className="text-decoration-none"
              >
                <img
                  src={require("../images/instagram-logo.png")}
                  className="ml-2"
                  height="20"
                  width="20"
                  alt="instagramLogo"
                />
              </a>
            </div>
          </div>
          <p className="footer-copyright mb-2 py-1">
            &copy; {new Date().getFullYear()} Desarrollado por{" "}
            <a
              target="_blank"
              href="https://lescanoleandro.vercel.app/"
              rel="noopener noreferrer"
              className="link-author"
            >
              Lescano Leandro Nicolas
            </a>
          </p>
        </div>
        {/* <div>
          <p className="footer-copyright mb-2 pb-1 pt-2">
            &copy; {new Date().getFullYear()} Desarrollado por Lescano Leandro
            Nicolas
            <a
              href="https://www.instagram.com/thefatmonkeydeco"
              target="_blank"
              rel="noopener noreferrer"
              className="float-right mr-2"
              style={{ position: "absolute", right: 0 }}
            >
              <img
                // src="https://www.flaticon.es/svg/static/icons/svg/174/174855.svg"
                src="../images/instagramLogo.svg"
                height="20"
                width="20"
                alt="instagramLogo"
              />
            </a>
          </p>
        </div> */}
      </footer>
    </React.Fragment>
  );
}

export default Footer;
