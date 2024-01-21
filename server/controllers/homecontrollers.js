const City = require('../models/citiesModel')
const axios = require('axios');

const getReport = async (req, res) => {
  let data = {}
  if (req.body.city) {
    const city = await City.findOne({city: req.body.city})
    await axios.post(`http://api.weatherstack.com/current?access_key=1d5d09ee5e7dd17b415b3ee71eec49db&query=${city.latitude},${city.longitude}`).then((response)=>{
      data={...response.data.current}
    })

    await axios.get(`https://api.open-elevation.com/api/v1/lookup?locations=${city.latitude},${city.longitude}`).then((response)=>{
      const elevation_data = response.data.results[0]
      data={...data, ...elevation_data}
    }).catch((err)=>{
      console.log(err.response.data)
    })
    await axios.post(`http://127.0.0.1:5000/predict`,data).then((response)=>{
      console.log(response.data)
      data={...data,"probability":response.data['prediction']}
    }).catch((err)=>{
      console.log(err)
    });

  }
  
  else{
    await axios.post(`http://api.weatherstack.com/current?access_key=1d5d09ee5e7dd17b415b3ee71eec49db&query=${req.body.latitude},${req.body.longitude}`).then((response)=>{
      data={...response.data.current}
    })

    await axios.get(`https://api.open-elevation.com/api/v1/lookup?locations=${req.body.latitude},${req.body.longitude}`).then((response)=>{
      const elevation_data = response.data.results[0]
      data={...data, ...elevation_data}
    }).catch((err)=>{
      console.log(err.response.data)
    })
    await axios.post(`http://127.0.0.1:5000/predict`,data).then((response)=>{
      console.log(response.data)
      data={...data,"probability":response.data['prediction']}
    }).catch((err)=>{
      console.log(err)
    });
  }
  
  res.send(data)
}

const getCities = async (req, res) => {
  try {
    const input = req.body.input;
    // Use Mongoose to find cities in the database
    const cities = await City.find({ city: { $regex: `^${input}`, $options: 'i' } });
    console.log(cities);

    res.send({ cities });
  } catch (error) {
    console.error('Error fetching cities:', error);
    res.status(500).send({ error: 'Internal Server Error' });
  }
};

module.exports = { getReport, getCities }
