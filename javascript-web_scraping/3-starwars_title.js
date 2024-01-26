#!/usr/bin/node
//  Write a script that prints the title of a Star Wars movie.

const request = require('request');

const movieId = process.argv[2];

const apiUrl = `https://swapi-api.hbtn.io/api/films/${movieId}`;

request.get(apiUrl, (error, response, body) => {
  if (error) {
    console.error(error);
  } else if (response.statusCode !== 200) {
    console.error('Error:', error);
  } else {
    const movieData = JSON.parse(body);
    console.log(movieData.title);
  }
});
