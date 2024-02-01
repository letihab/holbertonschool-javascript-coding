// 7-http_express.js
const express = require('express');
const countStudents = require('./3-read_file_async');

const app = express();
const databasePath = process.argv[2];

app.get('/', (req, res) => {
  res.send('Hello Holberton School!\n');
});

app.get('/students', async (req, res) => {
  try {
    await countStudents(databasePath);
    res.send('This is the list of our students\n');
  } catch (error) {
    res.status(500).send(`Error: ${error.message}\n`);
  }
});

app.listen(1245, () => {
  console.log('Server is listening on port 1245');
});

module.exports = app;
