const { Country, Activity } = require("../../db");
const axios = require("axios");

const api = "https://restcountries.com/v3.1";
const getApiInfo = async () => {
  const apiUrl = await axios.get(`${api}/all`);
  const apiInfo = await apiUrl.data.map((c) => {
    return {
      cca3: c.cca3,
      name: c.name.common,
      flag: c.flags.png,
      continent: c.continents[0],
      capital: c.capital ? c.capital[0] : "No capital",
      subregion: c.subregion,
      area: Number(c.area),
      population: Number(c.population),
    };
  });
  return apiInfo;
};

const apiToBd = async (allCountries) => {
  const dbInfo = await Country.bulkCreate(allCountries);
  return dbInfo;
};

const getDbInfo = async () => {
  return await Country.findAll({
    include: [
      {
        model: Activity,
        attributes: ["name"],
      },
    ],
  });
};

const getCountryByID = async (id) => {
  let idUC = id.toUpperCase();
  let countryInfo = await Country.findOne({
    where: {
      cca3: idUC,
    },
    include: [
      {
        model: Activity,
        attributes: ["name"],
      },
    ],
  });
  if (countryInfo) {
    return countryInfo;
  } else throw "Invalid ID";
};

const getAllCountries = async () => {
  let allCountries = await getDbInfo();
  if (!allCountries.length) {
    allCountries = await getApiInfo();
    await apiToBd(allCountries);
  }
  return allCountries;
};
const getCountryByName = async (name) => {
  const country = Country.findOne({ where: { name } });
  if (country) {
    return country;
  } else throw "There is no country with that name";
};

module.exports = {
  getApiInfo,
  apiToBd,
  getDbInfo,
  getCountryByID,
  getAllCountries,
  getCountryByName,
};
