import axios from "axios";

export const GET_COUNTRIES = "GET_COUNTRIES";
export const GET_COUNTRY_BY_SEARCHTERM = "GET_COUNTRY_BY_SEARCHTERM";
export const GET_COUNTRY_BY_ID = "GET_COUNTRY_BY_ID";
export const FILTER_BY_CONTINENT = "FILTER_BY_CONTINENT";
export const GET_ACTIVITIES = "GET_ACTIVITIES";
export const FILTER_BY_ACTIVITY = "FILTER_BY_ACTIVITY";
export const CHANGE_FILTER = "CHANGE_FILTER";
export const ERROR = "ERROR";
export const CHANGE_ORDER = "CHANGE_ORDER";
export const CREATE_ACTIVITY = "CREATE_ACTIVITY";

export function getCountries() {
  return async function (dispatch) {
    const json = await axios.get("http://localhost:3001/countries");
    return dispatch({
      type: GET_COUNTRIES,
      payload: json.data,
    });
  };
}

export function getCountryBySearchTerm(searchTerm) {
  return async function (dispatch) {
    try {
      let json = await axios.get(`http://localhost:3001/countries`, {
        params: { searchTerm },
      });
      return dispatch({
        type: GET_COUNTRY_BY_SEARCHTERM,
        payload: json.data,
      });
    } catch (error) {
      return dispatch({
        type: ERROR,
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
        type: ERROR,
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
  return {
    type: CHANGE_ORDER,
    payload: order,
  };
}

export function createActivity(payload) {
  return async function (dispatch) {
    const response = await axios.post(`http://localhost:3001/activities`, {
      name: payload.name[0].toUpperCase() + payload.name.slice(1).toLowerCase(),
      difficulty: payload.difficulty,
      duration: payload.duration,
      season: payload.season,
      ids: payload.ids,
    });
    return dispatch({
      type: CREATE_ACTIVITY,
      payload: response,
    });
  };
}
