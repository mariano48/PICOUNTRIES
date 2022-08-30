import {
  GET_COUNTRIES,
  GET_COUNTRY_BY_NAME,
  GET_ACTIVITIES,
  GET_COUNTRY_BY_ID,
  CHANGE_FILTER,
  CHANGE_ORDER,
  NOT_FOUND,
} from "../actions";
import { sortCountries } from "./utils";

const initialState = {
  countries: [],
  countriesFiltered: [],
  countryDetail: null,
  activities: [],
  filter: { continent: "", activityId: "" },
  order: { by: "name", direction: "ASC" },
  error: null,
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_COUNTRIES:
      return {
        ...state,
        countries: action.payload,
        countriesFiltered: sortCountries(action.payload, state.order),
        error: null,
      };

    case GET_COUNTRY_BY_ID:
      return {
        ...state,
        countryDetail: action.payload,
      };
    case GET_ACTIVITIES:
      return {
        ...state,
        activities: action.payload,
      };

    case GET_COUNTRY_BY_NAME:
      return {
        ...state,
        countriesFiltered: action.payload,
      };

    case CHANGE_FILTER:
      return {
        ...state,
        filter: action.payload,
      };

    case CHANGE_ORDER:
      let countries = state.countriesFiltered;
      return {
        ...state,
        countriesFiltered: sortCountries(countries, action.payload),
        order: action.payload,
      };
    case "POST_ACTIVITY":
      return {
        ...state,
      };

    case NOT_FOUND:
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
}

export default rootReducer;
