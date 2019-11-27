var express = require('express');
var router = express.Router();
var _ = require('lodash');
const axios = require('axios').default;


var movie = [];

  
  /* GET film listing. */
  router.get('/', (req, res) => {
    // Get List of user and return JSON
    res.status(200).json({ film });
  });
  
  /* GET one movie. */
  router.get('/:id', (req, res) => {
    const { id } = req.params;
    // Find movie in DataBase
    const movie = _.find(movie, ["id", id]);
    // On retourne le movie
    res.status(200).json({
      message: 'Movie found!',
      movie 
    });
  });
  /*test*/
  
  /* PUT new movie. */
  router.put('/', (req, res) => {
    // Get the data from request from request
    const { movie } = req.body;
    // Create new unique id
    const id = _.uniqueId();
    // Insert it in array (normaly with connect the data with the database)
    axios({
      method: 'get',
      url: 'http://www.omdbapi.com/?t=${name}&apikey=a62757f5',
      responseType: 'json'
  })
  .then(function(response) {
      const data = response.data;
      tabMovies.push({ data, id });
      // Return message
      res.status(200).json({
          message: 'Just added ${id}',
          movie: { data, id }
      });
  });
  });
  
  /* DELETE film. */
  router.delete('/:id', (req, res) => {
    // Get the :id of the user we want to delete from the params of the request
    const { id } = req.params;
  
    // Remove from "DB"
    _.remove(movie, ["id", id]);
  
    // Return message
    res.json({
      message: 'Just removed ${id}'
    });
  });
  
  /* UPDATE film. */
  router.post('/:id', (req, res) => {
    // On récupère l'ID en fonction des paramètres de la recherche
    const { id } = req.params;
    // On récupère la nouvelle data du film qu'on veut mettre à jour depuis le body
    const { movie } = req.body;
    // On trouve dans la database le film que l'on veut mettre à jour
    const movieToUpdate = _.find(movie, ["id", id]);
    // On met à jour le film
    movieToUpdate.movie = movie;
  
    // Return message
    res.json({
      message: 'Just updated ${id} with ${movie}'
    });
  });

module.exports = router;