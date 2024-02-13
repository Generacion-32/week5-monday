const City = require("../models/City")

async function createCities() {

  await City.bulkCreate([
    {
      name: "Valencia",
      country: "Venezuela",
      isCapital: false
    },
    {
      name: "Narino",
      country: "Colombia",
      isCapital: false
    },
    {
      name: "Malambo",
      country: "Colombia",
      isCapital: false
    },
  ])

}

module.exports = createCities