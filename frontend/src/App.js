import './App.scss';
import { Input } from 'antd';
import { useState } from 'react';
const axios = require("axios");

function App() {
  const [shortURL, setShortURL] = useState("");
  const [longURL, setLongURL] = useState("");
  
  function shortenURL(shorten){
    if (!shorten.includes("https://") && !shorten.includes("http://")) {
      shorten = "https://" + shorten
    }
    axios("http://localhost:9000/shorten", {params: {key: "7b44a008471660c11ea2036b2d40b75caf2fd", short: shorten}})
      //.then(res => console.log(JSON.parse(res.data.body).url.shortLink))
      .then(res => setShortURL(JSON.parse(res.data.body).url.shortLink))
      .then(res => console.log(shortURL))
  }
  
  function handleSearch(e) {
    if (!e.key || e.key === "Enter") {
      shortenURL(longURL)
    }
  }
  
  function handleSearchInput(e) {
    console.log(e.target.value)
    setLongURL(e.target.value)
  }

  return (
    <div className="main">
      <div className="search-bar">
        <Input.Search className="search-input search-home-scale" placeholder="Enter a URL" onChange={handleSearchInput} onKeyDown={handleSearch} onSearch={handleSearch}/>
        <div>{(shortURL !== "") && shortURL}</div>
      </div>
    </div>
  );
}

export default App;
