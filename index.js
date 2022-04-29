const express = require('express');
const cors = require('cors');
const axios = require('axios');
const dotenv = require('dotenv');
const path = require('path');
const app = express();

dotenv.config();

app.use(cors());

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/index.html'));
});

app.get('/word', async (req, res) => {
  const options = {
    method: 'GET',
    url: 'https://random-words5.p.rapidapi.com/getMultipleRandom',
    params: { count: '5', wordLength: '5' },
    headers: {
      'X-RapidAPI-Host': 'random-words5.p.rapidapi.com',
      'X-RapidAPI-Key': process.env.RAPIDAPI_KEY,
    },
  };

  try {
    const { data } = await axios.request(options);
    res.status(200).json(data[0]);
  } catch (error) {
    res.status(500).json(error);
  }
});

app.get('/check', (req, res) => {
  const options = {
    method: 'GET',
    url: 'https://twinword-word-graph-dictionary.p.rapidapi.com/association/',
    params: { entry: req.query.word },
    headers: {
      'X-RapidAPI-Host': 'twinword-word-graph-dictionary.p.rapidapi.com',
      'X-RapidAPI-Key': process.env.RAPIDAPI_KEY,
    },
  };

  axios
    .request(options)
    .then(function (response) {
      res.json(response.data.result_msg);
    })
    .catch(function (error) {
      console.error(error);
    });
});
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => console.log('Server is up and running on port: ', PORT));
