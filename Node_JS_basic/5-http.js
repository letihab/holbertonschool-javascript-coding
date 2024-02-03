const http = require('http');
const countStudents = require('./3-read_file_async');

const db = process.argv[2];

const app = http.createServer((req, res) => {
  const { url } = req;
  res.writeHead(200, { 'Content-type': 'text/plain' });

  if (url === '/') {
    res.write('Hello Holberton School!');
    res.end();
  }

  if (url === '/students') {
    countStudents(db)
      .then((result) => {
        res.write('This is the list of our students\n');
        res.write(`${result.sentence1}\n`);
        res.write(`${result.sentence2}\n`);
        res.write(`${result.sentence3}`);
        res.end();
      })
      .catch((error) => {
        res.write(`This is the list of our students\n${error.message}`);
        res.end();
      });
  }
}).listen(1245);
module.exports = app;
