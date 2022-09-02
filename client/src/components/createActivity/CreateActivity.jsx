import React, { useState, useEffect } from "react";
import { getActivities, getCountries, createActivity } from "../../actions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import "./createActivity.css";
import { getIds, searchCountry, validateInput } from "../utils/utils";
import Layout from "../layout/Layout";

export default function CreateActivity() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const countries = useSelector((state) => state.countries);
  const response = useSelector((state) => state.response);
  const error = useSelector((state) => state.error);
  const [errorInput, setErrorInput] = useState({});
  const [disable, setDisable] = useState(true);
  const [countriesList, setCountriesList] = useState([]);
  const [inputCountries, setInputCountries] = useState("");
  const [inputActivity, setInputActivity] = useState({
    name: "",
    difficulty: 1,
    duration: 1,
    season: "summer",
    ids: [],
  });

  useEffect(() => {
    dispatch(getCountries());
    dispatch(getActivities());
  }, [dispatch]);

  useEffect(() => {
    if (response) {
      alert(response);
      navigate("/countries");
    } else if (error) {
      alert(error);
    }
  }, [response, error, navigate]);

  function handleInputActivity(e) {
    const input = { ...inputActivity, [e.target.name]: e.target.value };
    setInputActivity(input);
    const errors = validateInput(input);
    setErrorInput(errors);
    setDisable(errors.disable);
  }

  function handleDatalistCountries(e) {
    setInputCountries(e.target.value);
  }

  function handleCountrySelect(e) {
    e.preventDefault();
    const country = searchCountry(inputCountries, countries);
    let list = [...countriesList, country];
    if (!country) {
      list = countriesList;
    }
    setCountriesList(list);
    const countriesIds = getIds(list);
    setInputActivity({
      ...inputActivity,
      ids: countriesIds,
    });
    setInputCountries("");
  }

  function deleteFromList(e) {
    e.preventDefault();
    const newList = countriesList.filter((c) => c.id !== e.target.value);
    const newIdsList = getIds(newList);
    setCountriesList(newList);
    setInputActivity({ ...inputActivity, ids: newIdsList });
  }

  function submitForm(e) {
    e.preventDefault(e);
    dispatch(createActivity(inputActivity));
    const input = {
      name: "",
      difficulty: 1,
      duration: 1,
      season: "summer",
      ids: [],
    };
    setInputActivity(input);
    setCountriesList(input.ids);
  }

  return (
    <Layout>
      <div className="mainDiv">
        <div className="backgroundForm">
          <h1> CREATE ACTIVITY</h1>
          <form>
            <div className="formContainer">
              <div className="formFirst">
                <div className="formFirstDivs">
                  <label>Name:</label>
                  <input
                    type="text"
                    value={inputActivity.name}
                    id={inputActivity.name}
                    placeholder="Insert name here"
                    name="name"
                    onChange={(e) => handleInputActivity(e)}
                  />
                  {errorInput.name ? <p>{errorInput.name}</p> : null}
                </div>
                <div className="formFirstDivs">
                  <label>Difficulty:</label>
                  <input
                    type="number"
                    value={inputActivity.difficulty}
                    id={inputActivity.difficulty}
                    name="difficulty"
                    onChange={(e) => handleInputActivity(e)}
                  />
                  {errorInput.difficulty ? (
                    <p>{errorInput.difficulty}</p>
                  ) : null}
                </div>
                <div className="formFirstDivs">
                  <label>Duration(Days):</label>
                  <input
                    type="number"
                    value={inputActivity.duration}
                    min="1"
                    max="365"
                    id={inputActivity.duration}
                    name="duration"
                    onChange={(e) => handleInputActivity(e)}
                  />
                  {errorInput.duration ? <p>{errorInput.duration}</p> : null}
                </div>
                <div className="formFirstDivs">
                  <label>Season:</label>
                  <select
                    name="season"
                    onChange={(e) => handleInputActivity(e)}
                  >
                    <option value="summer">Summer</option>
                    <option value="fall">Fall</option>
                    <option value="winter">Winter</option>
                    <option value="spring">Spring</option>
                  </select>
                </div>
                <div className="formFirstDivs">
                  <label>Countries to add this activity:</label>
                  <input
                    list="countries"
                    name="countries"
                    placeholder="Insert country to filter"
                    value={inputCountries}
                    onChange={(e) => handleDatalistCountries(e)}
                  />

                  <datalist id="countries">
                    {countries
                      ?.filter(
                        (c) => !countriesList.find((c2) => c2.id === c.id)
                      )
                      .map((c) => {
                        return <option key={c.id} value={c.name} id={c.id} />;
                      })}
                  </datalist>
                  <button
                    onClick={(e) => handleCountrySelect(e)}
                    className="buttonForm"
                  >
                    Add Country
                  </button>
                </div>
                <ul className="listIdsFlags">
                  {countriesList?.map((c) => {
                    return (
                      <div key={c.id} className="countryBubble">
                        <img src={c.flag} alt={c.name} />
                        <h6>{c.id}</h6>
                        <button value={c.id} onClick={(e) => deleteFromList(e)}>
                          X
                        </button>
                      </div>
                    );
                  })}
                </ul>
              </div>
            </div>
            <button
              type="submit"
              disabled={disable}
              onClick={(e) => submitForm(e)}
              className="buttonForm"
            >
              Create
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
}
