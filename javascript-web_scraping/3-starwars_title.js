#!/usr/bin/node
//Write a script that prints the title of a Star Wars movie where the episode number matches a given integer.

const request = require('request');

const movieId = process.argv[2];

if (!movieId || isNaN(movieId)) {
    console.error("Usage: node 3-starwars_title.js <movie_id>");
    process.exit(1);
}

const apiUrl = `https://swapi-api.hbtn.io/api/films/${movieId}`;

request(apiUrl, (error, response, body) => {
    if (error) {
        console.error(error);
    } else if (response.statusCode === 200) {
        const movie = JSON.parse(body);
        console.log(`Title: ${movie.title}`);
    } else {
        console.error(`Error: ${response.statusCode}`);
    }
});
