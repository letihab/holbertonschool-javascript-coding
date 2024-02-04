const http = require('http');
const fs = require('fs');

const app = http.createServer((req, res) => {
  if (req.method === 'GET' && req.url === '/') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hello Holberton School!\n');
  } else if (req.method === 'GET' && req.url === '/students') {
    const databaseFile = process.argv[2];
    if (!databaseFile) {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('Internal Server Error: Database file not provided.\n');
    } else {
      fs.readFile(databaseFile, 'utf8', (err, data) => {
        if (err) {
          res.writeHead(500, { 'Content-Type': 'text/plain' });
          res.end('Internal Server Error: Unable to read database file.\n');
        } else {
          const students = parseDatabase(data);
          const response = generateResponse(students);
          res.writeHead(200, { 'Content-Type': 'text/plain' });
          res.end(response);
        }
      });
    }
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found\n');
  }
});

app.listen(1245, 'localhost', () => {
  console.log('Server is running at http://localhost:1245/');
});

function parseDatabase(data) {
  const lines = data.split('\n').filter(line => line.trim() !== '');
  const students = { CS: [], SWE: [] };

  lines.forEach(line => {
    const [name, age, field] = line.split(',').map(item => item.trim());
    if (name && age && field && (field === 'CS' || field === 'SWE')) {
      students[field].push(name);
    }
  });

  return students;
}

function generateResponse(students) {
  let response = 'This is the list of our students\n';
  response += `Number of students: ${students.CS.length + students.SWE.length}\n`;
  response += `Number of students in CS: ${students.CS.length}. List: ${students.CS.join(', ')}\n`;
  response += `Number of students in SWE: ${students.SWE.length}. List: ${students.SWE.join(', ')}\n`;

  return response;
}
