const http = require('http');

const app = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-type': 'text/plain' });
  res.write('Hello Holberton School!');
  res.end();
}).listen(1245);
module.exports = app;
