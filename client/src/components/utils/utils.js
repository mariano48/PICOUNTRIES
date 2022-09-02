export function validateInput(values) {
  let errors = {};
  errors.disable = true;
  if (!values.name) {
    errors.name = "This field is required";
  } else if (!validateName(values.name)) {
    errors.name = "Please insert only letters (A-Z)";
  } else if (values.name.length < 3) {
    errors.name = "Minimum be 3 characters";
  } else if (values.name.length > 15) {
    errors.name = "Maximum be 15 characters";
  } else if (!values.difficulty) {
    errors.difficulty = "This field is required";
  } else if (values.difficulty < 1 || values.difficulty > 5) {
    errors.difficulty = "Only numbers between 1 and 5 are allowed";
  } else if (!values.duration) {
    errors.duration = "This field is required";
  } else if (values.duration < 1 || values.duration > 365) {
    errors.duration = "Please insert a number between 1 and 365";
  } else {
    errors.disable = false;
  }
  return errors;
}

export function searchCountry(value, countries) {
  const country = countries.filter((c) => c.name === value);
  if (country.length !== 0) {
    return country[0];
  }
  return;
}

export function getIds(countries) {
  const ids = countries.map((c) => c.id);
  return ids;
}

export const validateName = (name) => {
  return /^[a-zA-Z]{1,20}$/.test(name);
};
