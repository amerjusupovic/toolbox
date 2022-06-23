import './App.scss';
import { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';
import AppBar from "@mui/material/AppBar";
import { SwapSpinner } from "react-spinners-kit";
const axios = require("axios");

function App() {
  const [shortURL, setShortURL] = useState("");
  const [longURL, setLongURL] = useState("");
  const [loading, setLoading] = useState(false);
  
  function shortenURL(shorten){
    if (!shorten.includes("https://") && !shorten.includes("http://")) {
      shorten = "https://" + shorten
    }
    axios("/shorten", {params: {key: process.env.REACT_APP_CUTTLY_API_KEY, short: shorten}})
      .then(res => setShortURL(JSON.parse(res.data.body).url.shortLink))
      .then(res => console.log(shortURL))
    setLoading(false)
  }
  
  function handleSearch(e) {
    if (!e.key || e.key === "Enter") {
      setLoading(true);
      shortenURL(longURL)
    }
  }
  
  function handleSearchInput(e) {
    console.log(e.target.value)
    setLongURL(e.target.value)
  }

  return (
    <div className="main">
      <AppBar className="header-bar">
        <div className="header-title">besturl</div>
      </AppBar>
      <div className="search-bar">
        <div>
          <TextField variant="outlined" className="search-input" placeholder="Enter a URL" onChange={handleSearchInput} onKeyDown={handleSearch} onSearch={handleSearch}/>
          <Button variant="outlined" className="search-button"><SearchIcon/></Button>
        </div>
        <SwapSpinner color="#ffffff" loading={loading}/>
        <div className={loading ? "link-container" : "link-appear"}>Your link is ready!: {(shortURL !== "") && <a href={shortURL}>{shortURL}</a>}</div>
      </div>
    </div>
  );
}

export default App;
