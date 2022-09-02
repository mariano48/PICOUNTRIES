import React from "react";
import NavBar from "../navBar/NavBar";
import "./layout.css";

export default function Layout({ children }) {
  return (
    <div className="layoutContainer">
      <NavBar />
      <div className="childrenContainer"> {children}</div>
    </div>
  );
}
