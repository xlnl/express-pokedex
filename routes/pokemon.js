var express = require('express');
var router = express.Router();
const db = require("../models");
const { default: Axios } = require('axios');

// GET /pokemon - return a page with favorited Pokemon
router.get('/', function(req, res) {
  // TODO: Get all records from the DB and render to view
  db.pokemon.findAll()
  .then(foundPokemons => { 
    res.render("pokemon/index", {pokemon: foundPokemons});
    console.log(foundPokemons)
  }) .catch(err => {
    console.log(err);
  });
});

// POST /pokemon - receive the name of a pokemon and add it to the database
router.post('/', (req, res) => {
  // TODO: Get form data and add a new record to DB
  db.pokemon.findOrCreate( {
    where: {name: req.body.name}
  })
  .then((pokemon, wasCreated) => {
    console.log(pokemon)
    console.log("This was Pokemon entry created:", wasCreated)
    res.redirect("/pokemon");
  }) 
  .catch(err => {
    console.log(err);
  })
});


// Add a route GET /pokemon/:id that renders a show page with information about the Pokemon with the corresponding row id.
router.get('/:name', function(req, res) {
  var pokemonUrl = `http://pokeapi.co/api/v2/pokemon/${(req.params.name).toLowerCase()}`;
  Axios.get(pokemonUrl).then(apiResponse => {
    var pokemon = apiResponse.data;
    // render to show page
    res.render("pokemon/show", {pokemon})
  })
});

module.exports = router;