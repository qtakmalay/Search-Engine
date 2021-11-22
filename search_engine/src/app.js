const express = require('express');

const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <title>A JavaScript project</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
</head>
<body>
  <h1>A JavaScript project</h1>
</body>
</html>`;
const app = express();
const mongoose = require('mongoose');
const url = `mongodb+srv://azatsoft:PUn38zyJUyuge5xG@cluster0.azu6g.gcp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const connectionParams={ useNewUrlParser: true, useUnifiedTopology: true }
const searchRoutes = require("../routes/router_search");

mongoose.connect(url,connectionParams)
    .then( () => {
        console.log('Connected to database ')
    })
    .catch( (err) => {
        console.error(`Error connecting to the database. \n${err}`);
    });
app.use(searchRoutes);
app.get('/', (req, res) => {
  res.set('Content-Type', 'text/html');
  res.status(200).send(html);
});

module.exports = app;