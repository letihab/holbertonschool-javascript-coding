const http = require('http');
const countStudents = require('./3-read_file_async');

const app = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });

  if (req.url === '/') {
    res.end('Hello Holberton School!\n');
  } else if (req.url === '/students') {
    countStudents(process.argv[2])
      .then(() => {
        res.end('This is the list of our students\n');
      })
      .catch((error) => {
        res.end(`This is the list of our students\n${error.message}\n`);
      });
  } else {
    res.statusCode = 404;
    res.end('Not Found\n');
  }
}).listen(1245);

module.exports = app;
