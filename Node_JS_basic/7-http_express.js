const express = require('express');
const countStudents = require('./3-read_file_async');

const app = express();
const port = 1245;

app.get('/', (req, res) => {
  res.send('Hello Holberton School!\n');
});

app.get('/students', (req, res) => {
  countStudents(process.argv[2])
    .then((result) => {
      res.send(`This is the list of our students\n${result.sentence1}\n${result.sentence2}\n${result.sentence3}`);
    })
    .catch((error) => {
      res.status(500).send(`This is the list of our students\n${error.message}`);
    });
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
module.exports = app;
