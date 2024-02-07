const express = require('express');
const countStudents = require('./3-read_file_async');

const path = process.argv[2];

const app = express();
app.get('/', (req, response) => {
  response.send('Hello Holberton School!');
});
app.get('/students', (req, response) => {
  countStudents(path)
    .then((result) => {
      response.send(`This is the list of our students\n${result}`);
    })
    .catch((error) => {
      response.send(`This is the list of our students\n${error.message}`);
    });
});

const PORT = 1245;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

module.exports = app;
