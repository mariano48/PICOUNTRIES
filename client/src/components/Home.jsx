import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterByContinent, getCountries } from "../actions";
import { Link } from "react-router-dom";
import Card from "./Card";
import Paginated from "./Paginado";

export default function Home() {
  const dispatch = useDispatch();
  const allCountries = useSelector((state) => state.countriesFiltered);
  const firstPageCountries = allCountries.slice(0, 9);
  const restPageCountries = allCountries.slice(9, allCountries.length);
  const [currentPage, setCurrentPage] = useState(1);
  const countriesPerPage = 10;
  const indexOfLastCountry = (currentPage - 1) * countriesPerPage;
  const indexOfFirstCountry = indexOfLastCountry - countriesPerPage;
  const currentCountries =
    currentPage === 1
      ? firstPageCountries
      : restPageCountries.slice(indexOfFirstCountry, indexOfLastCountry);

  useEffect(() => {
    dispatch(getCountries());
  }, [dispatch]);

  const paginated = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  function handleClick(e) {
    e.preventDefault();
    dispatch(getCountries());
  }

  function handleFilterByContinent(e) {
    e.preventDefault();
    dispatch(filterByContinent(e.target.value));
    console.log(e.target.value);
  }

  return (
    <div>
      <Link to="/activity">Create Activity</Link>
      <h1>Countries APP</h1>
      <button
        onClick={(e) => {
          handleClick(e);
        }}
      >
        Reload Page
      </button>
      <div>
        <h3>Filter by:</h3>
        <select onChange={(e) => handleFilterByContinent(e)}>
          <option value="All">All</option>
          <option value="Africa">Africa</option>
          <option value="Antarctica">Antarctica</option>
          <option value="Asia">Asia</option>
          <option value="Europe">Europe</option>
          <option value="North America">North America</option>
          <option value="Oceania">Oceania</option>
          <option value="South America">South America</option>
        </select>
        <h3>Order by:</h3>
        <select>
          <option value="Name">Name</option>
          <option value="Population">Population</option>
        </select>
        <h3>Form</h3>
        <select>
          <option value="asc">Ascendant</option>
          <option value="des">Descendant</option>
        </select>
        <Paginated
          countriesPerPage={countriesPerPage}
          allCountries={allCountries.length}
          paginated={paginated}
        />
        {currentCountries?.map((c) => {
          return (
            <>
              <Link to={"/countries/ + c.cca3"} />
              <Card
                name={c.name}
                image={c.flag}
                continent={c.continent}
                key={c.cca3}
              />
            </>
          );
        })}
      </div>
    </div>
  );
}
