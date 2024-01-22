#!/usr/bin/node
//Write a script that writes a string to a file.

const fs = require('fs');

function writeStringInFile(filePath, content) {
    fs.writeFile(filePath, content, 'utf-8', (err) => {
        if (err) {
            console.error(err);
        } else {
            console.log(`Content successfully written to ${filePath}`);
        }
    });
}

if (process.argv.length !== 4) {
    console.error("Usage: node write_file.js <file_path> <content>");
    process.exit(1);
}

const filePath = process.argv[2];
const content = process.argv[3];

writeStringInFile(filePath, content);
