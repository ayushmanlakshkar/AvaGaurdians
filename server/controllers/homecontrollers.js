const City = require('../models/citiesModel')
const axios = require('axios');

const getReport = async (req, res) => {
  if (req.body.city) {
    const city = await City.findOne({city: req.body.city})
    let data = {}
    await axios.post(`http://api.weatherstack.com/current?access_key=1d5d09ee5e7dd17b415b3ee71eec49db&query=${city.latitude},${city.longitude}`).then((response)=>{
      data={...response.data.current}
    })
    await axios.get(`https://api.open-elevation.com/api/v1/lookup?locations=${city.latitude},${city.longitude}`).then((response)=>{
      const elevation_data = response.data.results[0]
      data={...data, ...elevation_data}
    })

  }
  res.send("You got a error")
}

const getCities = async (req, res) => {
  const input = req.body.input
  const cities = await City.find()
  console.log(cities)
  const filteres_cities = cities.filter(city => city.city.startsWith(input.toUpperCase()))
  res.send({ cities: filteres_cities })
}
module.exports = { getReport, getCities }