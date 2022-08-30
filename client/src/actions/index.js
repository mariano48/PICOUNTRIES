import axios from "axios";
export const GET_COUNTRIES = "GET_COUNTRIES";
export const GET_COUNTRY_BY_NAME = "GET_COUNTRY_BY_NAME";
export const GET_COUNTRY_BY_ID = "GET_COUNTRY_BY_ID";
export const FILTER_BY_CONTINENT = "FILTER_BY_CONTINENT";
export const GET_ACTIVITIES = "GET_ACTIVITIES";
export const FILTER_BY_ACTIVITY = "FILTER_BY_ACTIVITY";
export const CHANGE_FILTER = "CHANGE_FILTER";
export const NOT_FOUND = "NOT_FOUND";
export const CHANGE_ORDER = "CHANGE_ORDER";

export function getCountries() {
  return async function (dispatch) {
    const json = await axios.get("http://localhost:3001/countries");
    return dispatch({
      type: GET_COUNTRIES,
      payload: json.data,
    });
  };
}

export function getCountryByName(name) {
  return async function (dispatch) {
    try {
      let json = await axios.get(
        `http://localhost:3001/countries?searchTerm=${name}`
      );
      return dispatch({
        type: GET_COUNTRY_BY_NAME,
        payload: json.data,
      });
    } catch (error) {
      return dispatch({
        type: NOT_FOUND,
        payload: error,
      });
    }
  };
}

export function getCountryById(id) {
  return async function (dispatch) {
    try {
      let json = await axios.get(`http://localhost:3001/countries/${id}`);
      return dispatch({
        type: GET_COUNTRY_BY_ID,
        payload: json.data,
      });
    } catch (error) {
      return dispatch({
        type: NOT_FOUND,
        payload: error,
      });
    }
  };
}

export function getActivities() {
  return async function (dispatch) {
    const json = await axios.get("http://localhost:3001/activities/");
    return dispatch({
      type: GET_ACTIVITIES,
      payload: json.data,
    });
  };
}

export function filterBy(payload) {
  let id = payload.activityId;
  if (isNaN(id)) {
    id = "";
  }
  return async function (dispatch) {
    dispatch({ type: CHANGE_FILTER, payload });
    console.log(payload);
    const json = await axios.get("http://localhost:3001/countries", {
      params: { continent: payload.continent, activityId: id },
    });
    return dispatch({
      type: GET_COUNTRIES,
      payload: json.data,
    });
  };
}

export function changeOrder(order) {
  console.log(order);
  return {
    type: CHANGE_ORDER,
    payload: order,
  };
}

export function createActivity(payload) {
  return async function (dispatch) {
    const response = await axios.post(
      `http://localhost:3001/activities`,
      payload
    );
    return response;
  };
}
