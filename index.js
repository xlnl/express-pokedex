require('dotenv').config();
const express = require('express');
const db = require("./models");
const axios = require('axios'); 
const ejsLayouts = require('express-ejs-layouts');
const app = express();
const port = process.env.PORT || 3000;

app.use(require('morgan')('dev'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
app.use(ejsLayouts);
app.use(express.static("public")); 
// links your css??

// GET / - main index of site
app.get('/', function(req, res) {
  const pokemonUrl = 'http://pokeapi.co/api/v2/pokemon?limit=151/';
  // Use request to call the API
  axios.get(pokemonUrl).then( function(apiResponse) {
    const pokemon = apiResponse.data.results;
    res.render('index', { pokemon: pokemon.slice(0, 151) });
  })
});

// How does the app retrieve a list of Pokemon?
//    from pokedex api! 
// How many Pokemon does the API call retrieve? Why that many?
//    20 because it's the default limit > so have to change the url to: "http://pokeapi.co/api/v2/pokemon?limit=151/" to display all 151
// What are the routes defined in the application?
//    "/pokemon" & "/""
// Think about adding a Pokemon to your favorites.
// How will this data be submitted?
//    through a form with a method: post & action:"/pokemon"
// What will you have to do to save this data to a database?
//    we would use a post route to the /pokemon route and use a db method to findOrCreate the data to add it to our fave database
// What will you have to do to display favorite Pokemon?
//    we would use a get route with a db method find all favs and render the list of favorites


// Imports all routes from the pokemon routes file 
app.use('/pokemon', require('./routes/pokemon'));

const server = app.listen(port, function() {
  console.log('...listening on', port );
});

module.exports = server;
