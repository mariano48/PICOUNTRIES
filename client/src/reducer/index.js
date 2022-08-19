const initialState = {
  countries: [],
  countriesFiltered: [],
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_COUNTRIES":
      return {
        ...state,
        countries: action.payload,
        countriesFiltered: action.payload,
      };

    case "FILTER_BY_CONTINENT":
      const allCountries = state.countries;
      const filteredByContinent =
        action.payload === "All"
          ? allCountries
          : allCountries.filter((c) => c.continent === action.payload);
      console.log(filteredByContinent);
      return {
        ...state,
        countriesFiltered: [...filteredByContinent],
      };
    default:
      return state;
  }
}

export default rootReducer;
