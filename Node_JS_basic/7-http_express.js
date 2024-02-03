const express = require('express');
const countStudents = require('./3-read_file_async');

const app = express();
const db = process.argv[2];

app.get('/', (req, res) => {
  res.type('text/plain').send('Hello Holberton School!');
});

app.get('/students', (req, res) => {
  countStudents(db)
    .then((result) => {
      res.type('text/plain').send(`${result.sentence1}\n${result.sentence2}\n${result.sentence3}`);
    })
    .catch((error) => {
      res.status(500).send(`Cannot load the database\n${error.message}`);
    });
});

app.listen(1245, () => {
  console.log('Server is running on port 1245');
});

module.exports = app;
