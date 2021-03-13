import React from "react";
import Footer from "./footer";
import Navbar from "./navbar";
import "../styles/layout.css";

function Layout(props) {
  const children = props.children;

  return (
    <React.Fragment>
      <div className="parent">
        <header>
          <Navbar />
        </header>
        <main>{children}</main>
        {/* <ShoppingCart /> */}
        <footer>
          <Footer />
        </footer>
      </div>
    </React.Fragment>
  );
}

export default Layout;
