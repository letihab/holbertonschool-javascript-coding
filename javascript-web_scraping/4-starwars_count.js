#!/usr/bin/node
// prints the number of movies where the character “Wedge Antilles” is present.

const request = require('request');

const apiurl = process.argv[2];

request(apiurl, (error, response, body) => {
  if (error) {
    console.error(error);
  } else {
    const filmData = JSON.parse(body).results;
    let numberoffilm = 0;

    for (const film of filmData) {
      for (const character of film.characters) {
        if (character.includes('/18/')) {
          numberoffilm += 1;
        }
      }
    }
    console.log(numberoffilm);
  }
});
