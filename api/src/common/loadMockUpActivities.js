const { createActivity } = require("../controllers/activities/index.js");
const { getAllCountries } = require("../controllers/countries/index.js");

const ACTIVITIES = [
  "Tourism Adjectival",
  "Tourisms Adventure",
  "Recreation Agritour Backpacking",
  "Backpacking",
  "Bicycle",
  "Touring Camping Cultural",
  "Tourism Ecotourism Extreme",
  "Tourism Tramping Travel Ultralight",
  "Backpacking Urban",
  "Exploration Volunteer",
  "Travel Wildlife",
  "Tourism",
];
const seasons = ["winter", "summer", "spring", "fall"];

async function createInitialActivities() {
  const countries = await getAllCountries();
  for (let i = 0; i < ACTIVITIES.length; i++) {
    createActivity(
      ACTIVITIES[i],
      Math.floor(Math.random() * (5 - 1) + 1),
      Math.floor(Math.random() * (90 - 1) + 1),
      seasons[Math.floor(Math.random() * (4 - 1) + 1)],
      countries[Math.floor(Math.random() * (countries.length - 1 - 1) + 1)].id
    );
  }
}

module.exports = { createInitialActivities };
