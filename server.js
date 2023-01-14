
const express = require('express');
require('dotenv').config();
const app = express();
const cors = require("cors");
app.use(cors());
app.use(express.json());
const fetch = require("node-fetch");
const path = require("path");
const bodyParser = require('body-parser');

app.use(express.static(path.resolve(__dirname, "/dist/")));


app.use(bodyParser.json());


app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
  });

  app.get("/api/status", async (req, res) =>{
    res.send("hello");
  })

  app.get("/api/search/:query", async (req, res) => {
    var requestUrl = `https://api.watchmode.com/v1/autocomplete-search/?apiKey=${process.env.KEY}&search_value=${req.params.query}&search_type=2`;
    const response = await fetch(requestUrl);

    const data = await response.json()
    res.send(data);
  })

  app.get("/api/details/:id", async (req, res) => {

    var requestUrl = `https://api.watchmode.com/v1/title/${req.params.id}/sources/?apiKey=${process.env.KEY}`;
    const response = await fetch(requestUrl);

    const data = await response.json();
    res.send(data);
    
  })
  
  app.listen(process.env.PORT, '0.0.0.0',  () => {
    console.log(`Server running on port ${process.env.PORT}`);
  });
