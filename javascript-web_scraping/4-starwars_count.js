#!/usr/bin/node
// prints the number of movies where the character “Wedge Antilles” is present.

const request = require('request');

const apiurl = process.argv[2];

if(!apiurl) {
    console.error("Usage: node 4-starwars_count.js <api_url>");
    process.exit(1);
}

const wedgeAntillesId = 18;;

request(apiurl, (error, response, body) => {
    if (error) {
        console.error(error);
    } else if (response.statusCode === 200) {
        const filmsData = JSON.parse(body);
        const filmsWithWedgeAntilles = filmsData.results.filter(film =>
            film.characters.includes(`https://swapi-api.hbtn.io/api/people/${wedgeAntillesId}/`)
        );

        console.log(filmsWithWedgeAntilles.length);
    } else {
        console.error(`Error: ${response.statusCode}`);
    }
});
