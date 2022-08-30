import React from "react";
import "./countryCard.css";

export default function Card({ name, image, continent }) {
  return (
    <div className="countryCard">
      <h2>{name}</h2>
      <img src={image} alt="Img not found" width="200px" height="150px" />
      <h5>{continent}</h5>
    </div>
  );
}
