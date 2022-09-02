import {
  GET_COUNTRIES,
  GET_COUNTRY_BY_SEARCHTERM,
  GET_ACTIVITIES,
  GET_COUNTRY_BY_ID,
  CHANGE_FILTER,
  CHANGE_ORDER,
  ERROR,
  CREATE_ACTIVITY,
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
  response: null,
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_COUNTRIES:
      return {
        ...state,
        countries: action.payload,
        countriesFiltered: sortCountries(action.payload, state.order),
        response: null,
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

    case GET_COUNTRY_BY_SEARCHTERM:
      return {
        ...state,
        countriesFiltered: sortCountries(action.payload, state.order),
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
    case CREATE_ACTIVITY:
      if (action.payload.data === "Activity created succesfully") {
        return {
          ...state,
          response: action.payload.data,
        };
      } else {
        return {
          ...state,
          error: action.payload.data,
        };
      }

    case ERROR:
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
}

export default rootReducer;
