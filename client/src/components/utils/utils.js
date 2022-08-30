export function validateInput(values, activities) {
  let errors = {};
  if (!values.name) {
    errors.name = "This field is required";
  } else if (values.name.length < 4) {
    errors.name = "Minimum be 4 characters or more";
  } else if (!values.duration) {
    errors.duration = "You must enter the duration of the activity";
  } else if (values.duration < 1 || values.duration > 365) {
    errors.duration = "Please insert a number between 1 and 365";
  }
  // console.log(errors);
  return errors;
}

export function validateSelect(value) {
  let errors = {};

  if (!value) {
    errors.season = "Please select a season for the activity";
  }
  return errors;
}

export function searchCountry(value, countries) {
  const countryFiltered = countries.filter((c) => c.name === value);
  if (countryFiltered.length !== 0) {
    return countryFiltered[0];
  }
}

export function getIds(countries) {
  console.log(
    "a",
    countries.map((c) => c.id)
  );
  return countries.map((c) => c.id);
}
