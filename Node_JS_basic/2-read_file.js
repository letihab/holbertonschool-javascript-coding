// 2-read_file.js
const fs = require('fs');

function countStudents(path) {
  try {
    // Check if the file exists before attempting to read
    if (!fs.existsSync(path)) {
      throw new Error(`The database file '${path}' does not exist`);
    }

    const data = fs.readFileSync(path, 'utf8');
    const lines = data.split('\n').filter(line => line.trim() !== '');

    if (lines.length === 0) {
      throw new Error(`The database file '${path}' is empty`);
    }

    const fields = lines[0].split(',').map(field => field.trim());

    console.log(`Number of students: ${lines.length - 1}`);

    for (let i = 1; i < fields.length; i++) {
      const field = fields[i];
      const students = lines.slice(1).map(line => line.split(',')[i].trim()).filter(name => name !== '');

      console.log(`Number of students in ${field}: ${students.length}. List: ${students.join(', ')}`);
    }
  } catch (error) {
    console.error(error.message);
  }
}

module.exports = countStudents;
