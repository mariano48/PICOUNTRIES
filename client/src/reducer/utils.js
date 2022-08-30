export function sortCountries(countries, order) {
  let countriesToOrder = countries;
  function compareNames(a, b) {
    if (a.name < b.name) return -1;
    if (a.name > b.name) return 1;
    return 0;
  }
  function compareNamesDesc(a, b) {
    if (a.name < b.name) return 1;
    if (a.name > b.name) return -1;
    return 0;
  }

  function comparePopulations(a, b) {
    if (a.population < b.population) return -1;
    if (a.population > b.population) return 1;
    return 0;
  }
  function comparePopulationsDesc(a, b) {
    if (a.population < b.population) return 1;
    if (a.population > b.population) return -1;
    return 0;
  }
  if (order.by === "name") {
    if (order.direction === "ASC") {
      countriesToOrder = countriesToOrder.sort(compareNames);
    } else {
      countriesToOrder = countriesToOrder.sort(compareNamesDesc);
    }
  } else {
    if (order.direction === "ASC") {
      countriesToOrder = countriesToOrder.sort(comparePopulations);
    } else {
      countriesToOrder = countriesToOrder.sort(comparePopulationsDesc);
    }
  }
  return countriesToOrder;
}
