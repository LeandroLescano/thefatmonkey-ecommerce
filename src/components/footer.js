import React from "react";
import "../styles/footer.css";

function Footer() {
  return (
    <React.Fragment>
      <footer className="footer">
        <div>
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
                src="https://www.flaticon.es/svg/static/icons/svg/174/174855.svg"
                height="20"
                width="20"
                alt="instagramLogo"
              />
            </a>
          </p>
        </div>
      </footer>
    </React.Fragment>
  );
}

export default Footer;
