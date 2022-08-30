const { Router } = require("express");
const axios = require("axios");
const { Activity, Country } = require("../db.js");
const sequelize = require("sequelize");
const {
  createActivity,
  getAllActivities,
} = require("../controllers/activities/index.js");
const {
  getCountryByID,
  getAllCountries,
} = require("../controllers/countries/index.js");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get("/countries", async (req, res) => {
  const { searchTerm, continent, activityId } = req.query;
  try {
    const countries = await getAllCountries(searchTerm, continent, activityId);
    return res.status(200).json(countries);
  } catch (error) {
    return res.status(404).send(error);
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

router.get("/activities", async (req, res) => {
  try {
    const allActivities = await getAllActivities();
    res.status(200).json(allActivities);
  } catch (error) {
    res.status(400).json({ error: error });
  }
});
router.post("/activities", async (req, res) => {
  const { name, difficulty, season, duration, ids } = req.body;
  try {
    let newActivity = await createActivity(
      name,
      difficulty,
      season,
      duration,
      ids
    );
    res.status(200).send(newActivity);
  } catch (error) {
    res.status(400).json({ error: error });
  }
});

module.exports = router;
