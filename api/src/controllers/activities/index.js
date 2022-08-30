const { Activity } = require("../../db");

const createActivity = async (name, difficulty, season, duration, ids) => {
  console.log(ids);
  if (!name || !difficulty || !duration || !season || !ids.length) {
    throw "Debe ingresar todos los campos obligatorios";
  } else if (
    season === "summer" ||
    season === "fall" ||
    season === "winter" ||
    season === "spring"
  ) {
    const activity = await Activity.create({
      name,
      difficulty,
      duration,
      season,
    });
    await activity.setCountries(ids);

    return `${name}: Actividad creada correctamente`;
  } else {
    throw "La temporada ingresada es invalida";
  }
};

const getAllActivities = async () => {
  const activities = await Activity.findAll();
  return activities;
};

module.exports = { createActivity, getAllActivities };
