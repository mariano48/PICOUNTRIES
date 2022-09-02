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

const router = Router();

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
  let newActivity = await createActivity(
    name,
    difficulty,
    duration,
    season,
    ids
  );
  newActivity ? res.status(200).send(newActivity) : res.json([]);
});

module.exports = router;
