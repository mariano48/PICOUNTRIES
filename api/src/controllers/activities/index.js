const { Activity } = require("../../db");
const Country = require("../../models/Country");

const createActivity = async (name, difficulty, season, duration, ids) => {
  if (!name || !difficulty || !duration || !season) {
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
    return `${name}: Actividad creada correctamente`;
  } else {
    throw "La temporada ingresada es invalida";
  }
};

module.exports = { createActivity };
