import './App.scss';
import { Input } from 'antd';
import { useState } from 'react';
const axios = require("axios");
const express = require('express');
const app = express();
const request = require('request');

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

app.get('/shorten', (req, res) => {
  console.log(req)
  request(
    { url: 'https://cutt.ly/api/api.php', qs: {key: req.query.CUTTLY_API_KEY, short: req.query.short} },
    (error, response, body) => {
      if (error || response.statusCode !== 200) {
        return res.status(500).json({ type: 'error', message: error.message });
      }

      res.json(JSON.parse(body));
    }
  )

  
  axios.get('https://cutt.ly/api/api.php', {params: {key: process.env.CUTTLY_API_KEY, short: "bestdex.vercel.app", name: "cutt.ly/amerjusupovic"}, 
  headers: {"Access-Control-Allow-Origin": "*"}}).then(function (response) {
    console.log(response.data)
    return response.data;
  }).catch(function (error) {
    console.error(error);
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`listening on ${PORT}`));

function App() {
  const [shortURL, setShortURL] = useState("");
  const [longURL, setLongURL] = useState("");
  
  async function shortenURL(shorten){  
    let data = "";
  
    data = await axios.get('/shorten', {params: {key: process.env.CUTTLY_API_KEY, short: shorten}}).then(function (response) {
      console.log(response.data)
      return response.data.shortLink;
    }).catch(function (error) {
      console.error(error);
    });

    return data;
  }
  
  function handleSearch(e) {
    if (!e.key || e.key === "Enter") {
      setShortURL(shortenURL(longURL))
    }
  }
  
  function handleSearchInput(e) {
    console.log(e.target.value)
    setLongURL(e.target.value)
  }

  return (
    <div className="main">
      <div className="search-bar"><Input.Search className="search-input search-home-scale" placeholder="Enter a URL" onChange={handleSearchInput} onKeyDown={handleSearch} onSearch={handleSearch}/></div>
      <div>{(shortURL !== "") && shortURL}</div>
    </div>
  );
}

export default App;
