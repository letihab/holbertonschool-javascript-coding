#!/usr/bin/node
//Write a script that reads and prints the content of a file.

const fs = require('fs');

const filePath = process.argv[2];


function readAndPrintFile(filePath) {
    fs.readFile(filePath, 'utf-8', (err, data) => {
        if (err) {
            console.error(err);
        } else {
            console.log("File Content:");
            console.log(data);
        }
    });
}

if (!filePath) {
    console.error("Usage: node read_file.js <file_path>");
} else {
    readAndPrintFile(filePath);
}
