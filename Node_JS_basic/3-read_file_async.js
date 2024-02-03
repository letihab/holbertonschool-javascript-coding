const fs = require('fs');

function countStudents(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'utf8', (err, data) => {
      if (err) {
        reject(new Error('Cannot load the database'));
        return;
      }

      const lines = data.trim().split('\n');

      if (lines.length <= 1) {
        reject(new Error('No valid students in the database'));
        return;
      }

      const header = lines[0].split(',');
      const students = lines.slice(1).map((line) => line.split(','));

      const fieldIndex = header.indexOf('field');
      if (fieldIndex === -1) {
        reject(new Error('Invalid CSV format: "field" column not found'));
        return;
      }

      const fields = {};

      students.forEach((student) => {
        const [firstname, , , field] = student.map((item) => item.trim());

        if (field in fields) {
          fields[field].count += 1;
          fields[field].list.push(firstname);
        } else {
          fields[field] = { count: 1, list: [firstname] };
        }
      });

      console.log(`Number of students: ${students.length}`);
      for (const field in fields) {
        if (Object.prototype.hasOwnProperty.call(fields, field)) {
          const { count, list } = fields[field];
          console.log(`Number of students in ${field}: ${count}. List: ${list.join(', ')}`);
        }
      }

      resolve();
    });
  });
}

module.exports = countStudents;
