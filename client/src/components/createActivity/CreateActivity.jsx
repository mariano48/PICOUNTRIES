import React, { useState, useEffect } from "react";
// import { Link, useHistory } from "react-router-dom";
import { getActivities, getCountries, createActivity } from "../../actions";
import { useDispatch, useSelector } from "react-redux";
import "./createActivity.css";
import {
  getIds,
  searchCountry,
  validateInput,
  validateSelect,
} from "../utils/utils";

export default function CreateActivity() {
  const dispatch = useDispatch();
  const countries = useSelector((state) => state.countries);
  const [error, setError] = useState({});
  const [disable, setDisable] = useState(true);
  const [countriesList, setCountriesList] = useState([]);
  const [inputCountries, setInputCountries] = useState("");
  const [inputActivity, setInputActivity] = useState({
    name: "",
    difficulty: "",
    duration: "",
    season: "summer",
    ids: [],
  });

  useEffect(() => {
    dispatch(getCountries());
    dispatch(getActivities());
  }, [dispatch]);

  function handleInputActivity(e) {
    setInputActivity({ ...inputActivity, [e.target.name]: e.target.value });
    const validationInput = validateInput(inputActivity);
    setError(validationInput);
    if (!error.name || !error.duration || !error.difficulty || !error.season) {
      setDisable(false);
    } else {
      setDisable(true);
    }
  }

  function handleSelect(e) {
    setInputActivity({ ...inputActivity, season: e.target.value });
    const validationSel = validateSelect(inputActivity);
    setError(validationSel);
    if (!error.name && !error.duration && !error.difficulty && !error.season) {
      setDisable(false);
    }
  }

  function handleDatalistCountries(e) {
    setInputCountries(e.target.value);
  }

  function handleCountrySelect(e) {
    e.preventDefault();
    const country = searchCountry(inputCountries, countries);
    setCountriesList([...countriesList, country]);
    const countriesIds = getIds(countriesList);
    setInputActivity({
      ...inputActivity,
      ids: [countriesIds],
    });
    setInputCountries("");
  }

  function submitForm(e) {
    e.preventDefault();
    console.log(inputActivity);
  }

  return (
    <div className="mainDiv">
      <h1> CREATE ACTIVITY</h1>
      <form>
        <div>
          <div>
            <label>Name:</label>
            <input
              type="text"
              id={inputActivity.name}
              name="name"
              onChange={(e) => handleInputActivity(e)}
            />
            {error.name ? <p>{error.name}</p> : null}
          </div>
          <div>
            <label>Difficulty:</label>
            <input
              type="number"
              min="1"
              max="5"
              defaultValue="1"
              id={inputActivity.difficulty}
              name="difficulty"
              onChange={(e) => handleInputActivity(e)}
            />
          </div>
          <div>
            <label>
              Duration:
              <input
                type="number"
                defaultValue="1"
                min="1"
                max="365"
                id={inputActivity.duration}
                name="duration"
                onChange={(e) => handleInputActivity(e)}
              />
              Days
            </label>
          </div>
          <div>
            <label>
              Season:
              <select name="season" onChange={handleSelect}>
                <option value="summer">Summer</option>
                <option value="fall">Fall</option>
                <option value="winter">Winter</option>
                <option value="spring">Spring</option>
              </select>
            </label>
          </div>

          <label>Countries to add this activity:</label>
          <input
            list="countries"
            name="countries"
            onChange={(e) => handleDatalistCountries(e)}
          />
          <datalist id="countries">
            {countries &&
              countries.map((c) => {
                return <option key={c.id} value={c.name} id={c.id} />;
              })}
          </datalist>
          <button onClick={(e) => handleCountrySelect(e)}>Add</button>
          <ul>
            {countriesList?.map((c) => {
              console.log(c);
              return <li key={c.id}>{c.id}</li>;
            })}
          </ul>

          <button
            type="submit"
            disabled={disable}
            onClick={(e) => submitForm(e)}
          >
            Create
          </button>
        </div>
      </form>
    </div>
  );
}
