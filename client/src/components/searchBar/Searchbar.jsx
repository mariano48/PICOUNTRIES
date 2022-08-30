import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getCountryByName } from "../../actions";

export default function SearchBar() {
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  function handleInputChange(e) {
    e.preventDefault();
    setName(e.target.value);
  }

  function handleSubmitName(e) {
    e.preventDefault();
    dispatch(getCountryByName(e.target.id));
  }

  return (
    <form className="form">
      <input
        type="text"
        placeholder="Search by name..."
        onChange={handleInputChange}
      />
      <input
        type="submit"
        id={name}
        value="Search"
        onClick={handleSubmitName}
      />
    </form>
  );
}
