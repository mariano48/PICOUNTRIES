import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getActivities,
  getCountries,
  filterBy,
  changeOrder
} from '../../actions';
import Paginated from '../paginated/Paginated';
import Cards from '../countriesCards/CountriesCards';
import './home.css';
import Layout from '../layout/Layout';
import SearchBar from '../searchBar/Searchbar';

export default function Home() {
  const dispatch = useDispatch();
  const allCountries = useSelector((state) => state.countriesFiltered);
  const allAcitivities = useSelector((state) => state.activities);
  const filterValues = useSelector((state) => state.filter);
  const error = useSelector((state) => state.error);
  const orderValues = useSelector((state) => state.order);
  const firstPageCountries =
    allCountries.length > 10 ? allCountries.slice(0, 9) : allCountries;
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
    dispatch(getActivities());
    dispatch(getCountries());
  }, [dispatch]);

  useEffect(() => {
    setCurrentPage(1);
  }, [allCountries]);

  const paginated = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  function handleFilterByContinent(e) {
    dispatch(filterBy({ ...filterValues, continent: e.target.value }));
    setCurrentPage(1);
  }

  function handleFilterByActivities(e) {
    e.preventDefault();
    dispatch(filterBy({ ...filterValues, activityId: Number(e.target.value) }));
    dispatch(changeOrder(orderValues));
    setCurrentPage(1);
  }

  function handleOrder(e) {
    e.preventDefault();
    const newOrder = { ...orderValues, by: e.target.value };
    dispatch(changeOrder(newOrder));
  }

  function handleOrderDirection(e) {
    e.preventDefault();
    const newOrder = { ...orderValues, direction: e.target.value };
    dispatch(changeOrder(newOrder));
  }

  return (
    <Layout>
      <div>
        <div className="selectContainer">
          <div className="filtersContainer">
            <div>
              <div>
                <p>Filter by:</p>
              </div>
              <div>
                <select
                  onChange={(e) => {
                    handleFilterByContinent(e);
                  }}
                >
                  <option id="All" value="">
                    All Continents
                  </option>
                  <option id="Africa" value="Africa">
                    Africa
                  </option>
                  <option id="Antarctica" value="Antarctica">
                    Antarctica
                  </option>
                  <option id="Asia" value="Asia">
                    Asia
                  </option>
                  <option id="Europe" value="Europe">
                    Europe
                  </option>
                  <option id="North America" value="North America">
                    North America
                  </option>
                  <option id="Oceania" value="Oceania">
                    Oceania
                  </option>
                  <option id="South America" value="South America">
                    South America
                  </option>
                </select>
              </div>

              <select onChange={(e) => handleFilterByActivities(e)}>
                <option value="All" id="0">
                  All Activities
                </option>
                {allAcitivities?.map((a) => {
                  return (
                    <option value={a.id} key={a.id}>
                      {a.name}
                    </option>
                  );
                })}
              </select>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <p>Order by:</p>
              <select onChange={(e) => handleOrder(e)}>
                <option id="name" value="name">
                  Name
                </option>
                <option id="population" value="population">
                  Population
                </option>
              </select>
              <select onChange={(e) => handleOrderDirection(e)}>
                <option id="ASC" value="ASC">
                  Ascendant
                </option>
                <option id="DESC" value="DESC">
                  Descendant
                </option>
              </select>
            </div>

            <div>
              <div>
                <p>Search by term:</p>
              </div>
              <SearchBar />
            </div>
          </div>
          <div>
            <Paginated
              countriesPerPage={countriesPerPage}
              allCountries={allCountries.length}
              paginated={paginated}
              currentPage={currentPage}
            />
          </div>
        </div>
        <div className="cardsContainer">
          {error ? <p>{error}</p> : <Cards countries={currentCountries} />}
        </div>
      </div>
    </Layout>
  );
}
