import React from "react";

export default function Card({ name, image, continent }) {
  return (
    <div>
      <h2>{name}</h2>
      <img src={image} alt="Img not found" width="200px" height="150px" />
      <h5>{continent}</h5>
    </div>
  );
}
