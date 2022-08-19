import React from "react";
import axios from "axios";

export function getCountries() {
  return async function (dispatch) {
    const json = await axios.get("http://localhost:3001/countries");
    return dispatch({
      type: "GET_COUNTRIES",
      payload: json.data,
    });
  };
}

export function filterByContinent(payload) {
  return {
    type: "FILTER_BY_CONTINENT",
    payload,
  };
}

export function orderBy(payload) {
  return {
    type: "ORDER_BY",
    payload,
  };
}
