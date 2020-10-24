var express = require('express');
var router = express.Router();

// GET /pokemon - return a page with favorited Pokemon
router.get('/', function(req, res) {
  // TODO: Get all records from the DB and render to view
  res.send('Render a page of favorites here');
  // db.pokemon.findAll()
  // render results file of that pokemon
});



// POST /pokemon - receive the name of a pokemon and add it to the database
router.post('/', function(req, res) {
  // TODO: Get form data and add a new record to DB
  res.send(req.body);
  // db.pokemon.findOrCreate()
  // redirect this to /pokemon
});



module.exports = router;
