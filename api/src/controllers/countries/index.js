const { Country, Activity } = require("../../db");
const axios = require("axios");
const { Op } = require("sequelize");

const api = "https://restcountries.com/v3.1";
const getApiInfo = async () => {
  const apiUrl = await axios.get(`${api}/all`);
  const apiInfo = apiUrl.data.map((c) => {
    return {
      id: c.cca3,
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

const getDbInfo = async (searchTerm, continent, activityId) => {
  let filter = {};

  if (continent) {
    filter.continent = { continent };
  }
  if (activityId) {
    filter.activity = { id: { [Op.eq]: Number(activityId) } };
  }
  if (searchTerm) {
    filter.searchTerm = { name: { [Op.iLike]: `%${searchTerm}%` } };
  }

  const countries = await Country.findAll({
    where: { ...filter.continent, ...filter.searchTerm },
    include: [
      {
        model: Activity,
        where: filter.activity,
        attributes: [],
        through: { attributes: [] },
      },
    ],
  });
  return countries;
};

const getCountryByID = async (id) => {
  let idUC = id.toUpperCase();
  let countryInfo = await Country.findOne({
    where: {
      id: idUC,
    },
    include: [
      {
        model: Activity,
        attributes: ["id", "name", "difficulty", "duration", "season"],
        through: {
          attributes: [],
        },
      },
    ],
  });
  if (countryInfo) {
    return countryInfo;
  } else throw "Invalid ID";
};

const getAllCountries = async (searchTerm, continent, activity) => {
  let allCountries = await getDbInfo(searchTerm, continent, activity);
  return allCountries;
};
const getCountryByName = async (name) => {
  const nameRight = name[0].toUpperCase() + name.slice(1).toLowerCase();
  const country = Country.findOne({ where: { name: nameRight } });
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
  // orderBy,
};
