import React from "react";
import "./countryCard.css";

export default function Card({ name, image, continent }) {
  return (
    <div className="countryCard">
      <img src={image} alt="Img not found" width="320px" height="160px" />
      <h3>
        <b>{name}</b>
      </h3>
      <p>Continent: {continent}</p>
    </div>
  );
}
