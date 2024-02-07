const http = require('http');
const countStudents = require('./3-read_file_async');

const path = process.argv[2];

const app = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-type': 'text/plain' });
  if (req.method === 'GET') {
    if (req.url === '/') {
      res.end('Hello Holberton School!');
    } else if (req.url === '/students') {
      res.write('This is the list of our students\n');
      countStudents(path)
        .then((result) => {
          res.end(`${result}`);
        })
        .catch((error) => {
          res.end(error.message);
        });
    }
  }
}).listen(1245);

module.exports = app;
