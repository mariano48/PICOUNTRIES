import React from "react";
import NavBar from "../navBar/navBar";

export default function Layout({ children }) {
  return (
    <div className="layoutContainer">
      <div>
        <NavBar />
      </div>
      <div className="childrenContainer"> {children}</div>
    </div>
  );
}
