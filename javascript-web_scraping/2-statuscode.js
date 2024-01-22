#!/usr/bin/node
//Write a script that display the status code of a GET request.

const request = require('request');

const url = process.argv[2];

if (!url) {
    console.error("Usage: node 2-statuscode.js <url>");
    process.exit(1);
}

request.get(url, (error, response) => {
    if (error) {
        console.error(error);
    } else {
        console.log('code: ${response.statusCode}');
    }
});
