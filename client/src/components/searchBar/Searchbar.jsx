import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getCountryBySearchTerm } from "../../actions";

export default function SearchBar() {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");

  function handleInputChange(e) {
    e.preventDefault();
    setSearchTerm(e.target.value);
  }

  function handleSubmitSearchTerm(e) {
    e.preventDefault();
    dispatch(getCountryBySearchTerm(e.target.id));
    setSearchTerm("");
  }

  return (
    <form className="form">
      <input value={searchTerm} type="text" onChange={handleInputChange} />
      <input
        type="submit"
        id={searchTerm}
        value="Search"
        onClick={handleSubmitSearchTerm}
      />
    </form>
  );
}
