import React from "react";
import Footer from "./footer";
import Navbar from "./navbar";
function Layout(props) {
  const children = props.children;

  return (
    <React.Fragment>
      {/* <Navbar /> */}
      {children}
      <Footer />
    </React.Fragment>
  );
}

export default Layout;
