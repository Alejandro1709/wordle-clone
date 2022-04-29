const express = require('express');
const cors = require('cors');
const axios = require('axios');
const dotenv = require('dotenv');
const app = express();

dotenv.config();

const options = {
  method: 'GET',
  url: 'https://random-words5.p.rapidapi.com/getMultipleRandom',
  params: { count: '5', wordLength: '5' },
  headers: {
    'X-RapidAPI-Host': process.env.RAPIDAPI_HOST,
    'X-RapidAPI-Key': process.env.RAPIDAPI_KEY,
  },
};

app.use(cors());

app.get('/word', async (req, res) => {
  try {
    const { data } = await axios.request(options);
    res.status(200).json(data[0]);
  } catch (error) {
    res.status(500).json(error);
  }
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => console.log('Server is up and running on port: ', PORT));
