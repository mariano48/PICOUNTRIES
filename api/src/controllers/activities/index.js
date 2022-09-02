const { Op } = require("sequelize");
const { Activity } = require("../../db");

const createActivity = async (name, difficulty, duration, season, ids) => {
  if (!name || !difficulty || !duration || !season || !ids.length) {
    return "Please enter all the obligatory fields";
  } else if (
    season === "summer" ||
    season === "fall" ||
    season === "winter" ||
    season === "spring"
  ) {
    duration = Number(duration);
    const exist = await Activity.findAll({
      where: { name },
    });
    if (!exist.length) {
      const activity = await Activity.create({
        name,
        difficulty,
        duration,
        season,
      });
      await activity.setCountries(ids);
      return `Activity created succesfully`;
    } else return `Theres already an activity with that name`;
  } else {
    return "The season is not valid";
  }
};

const getAllActivities = async () => {
  const activities = await Activity.findAll();
  return activities;
};

module.exports = { createActivity, getAllActivities };
