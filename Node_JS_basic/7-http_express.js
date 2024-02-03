const express = require('express');
const countStudents = require('./3-read_file_async');

const app = express();
const db = process.argv[2];

app.get('/', (req, res) => {
  const message = 'Hello Holberton School!';
  res.type('text/plain').send(message);
});
app.get('/students', (req, res) => {
  const messageIntro = 'This is the list of our students';
  countStudents(db)
    .then((result) => {
      const message1 = result.sentence1;
      const message2 = result.sentence2;
      const message3 = result.sentence3;
      const fullMessage = `${messageIntro}\n${message1}\n${message2}\n${message3}`;
      res.type('text/plain').send(fullMessage);
    })
    .catch((error) => {
      const errorMessage = `${messageIntro}\n${error.message}`;
      res.type('text/plain').send(errorMessage);
    });
});
app.listen(1245);
module.exports = app;
