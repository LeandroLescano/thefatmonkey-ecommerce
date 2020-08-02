import React, { useEffect } from "react";
import "../styles/side-bar.css";

function SideBar(props) {
  const handleClick = (category) => {
    props.categories.forEach((item) => {
      document.getElementById(item).classList.remove("active");
    });
    if (category === "") {
      document.getElementById("todos").classList.add("active");
    } else {
      document.getElementById("todos").classList.remove("active");
      document.getElementById(category).classList.add("active");
    }
    props.changeCategory(category);
  };

  useEffect(() => {
    var sidebar = document.getElementById("sidebarMenu");
    setTimeout(() => {
      sidebar.style.display = "block";
    }, 2000);
  });

  return (
    <>
      <div
        id="sidebarMenu"
        className="bg-light sidebar"
        style={{ display: "none" }}
      >
        <div className="sidebar-sticky pt-3">
          <ul className="nav flex-column">
            <li className="nav-item active" id="todos">
              <a href="/#" className="nav-link" onClick={() => handleClick("")}>
                Todas
              </a>
            </li>
            {props.categories.map((item, i) => {
              return (
                <li key={i} className="nav-item" id={item}>
                  <a
                    href="/#"
                    className="nav-link item-sidebar"
                    onClick={() => handleClick(item)}
                  >
                    {item}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
}

export default SideBar;
