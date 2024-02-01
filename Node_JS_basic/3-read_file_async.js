// 3-read_file_async.js
const fs = require('fs');

function countStudents(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'utf8', (error, data) => {
      if (error) {
        reject(new Error('Cannot load the database'));
        return;
      }

      const lines = data.split('\n').filter(line => line.trim() !== '');

      if (lines.length === 0) {
        reject(new Error('The database is empty'));
        return;
      }

      const fields = lines[0].split(',').map(field => field.trim());

      console.log(`Number of students: ${lines.length - 1}`);

      for (let i = 1; i < fields.length; i++) {
        const field = fields[i];
        const students = lines.slice(1).map(line => line.split(',')[i].trim()).filter(name => name !== '');

        console.log(`Number of students in ${field}: ${students.length}. List: ${students.join(', ')}`);
      }

      resolve();
    });
  });
}

module.exports = countStudents;
