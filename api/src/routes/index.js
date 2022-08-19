const { Router } = require("express");
const axios = require("axios");
const { Activity, Country } = require("../db.js");
const sequelize = require("sequelize");
const { createActivity } = require("../controllers/activities/index.js");
const {
  getCountryByID,
  getAllCountries,
  getApiInfo,
  apiToBd,
  getDbInfo,
  getCountryByName,
} = require("../controllers/countries/index.js");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get("/countries", async (req, res) => {
  const { name } = req.query;
  let getCountries = await getAllCountries();
  if (name) {
    try {
      const country = await getCountryByName(name);
      return res.status(200).json(country);
    } catch (error) {
      return res.status(404).send(error);
    }
  } else {
    try {
      return res.status(200).json(getCountries);
    } catch (error) {
      return res.status(404).json({ error: error });
    }
  }
});

router.get("/countries/:id", async (req, res) => {
  const { id } = req.params;
  try {
    let countryById = await getCountryByID(id);
    res.status(200).json(countryById);
  } catch (error) {
    console.log(error);
    res.status(404).json({ error: error });
  }
});

router.post("/activities", async (req, res) => {
  const { name, difficulty, season, duration } = req.body;
  try {
    let newActivity = await createActivity(name, difficulty, season, duration);
    res.status(200).send(newActivity);
  } catch (error) {
    res.status(400).json({ error: error });
  }
});

module.exports = router;
