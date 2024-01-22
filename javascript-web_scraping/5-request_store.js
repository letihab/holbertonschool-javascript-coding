#!/usr/bin/node
//gets the contents of a webpage and stores it in a file

const request = require('request');
const fs = require('fs');

const url = process.argv[2];
const filePath = process.argv[3];

if (!url || !filePath) {
    console.error("Usage: node 5-request_store.js <url> <file_path>");
    process.exit(1);
}

request(url, (error, response, body) => {
    if (error) {
        console.error(error);
    } else if (response.statusCode === 200) {
        fs.writeFile(filePath, body, 'utf-8', (writeError) => {
            if (writeError) {
                console.error(writeError);
            } else {
                console.log(`Webpage content successfully stored in ${filePath}`);
            }
        });
    } else {
        console.error(`Error: ${response.statusCode}`);
    }
});
