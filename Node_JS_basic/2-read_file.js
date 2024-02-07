const fs = require('fs');

function countStudents(path) {
  try {
    const data = fs.readFileSync(path, 'utf8');
    const countByField = { CS: [], SWE: [] };
    const students = data.split('\n');
    students.filter((line) => line.trim() !== '')
      .forEach((item) => {
        const values = item.split(',');
        const field = values[3].trim();
        if (field === 'CS' || field === 'SWE') { countByField[field].push(values[0]); }
      });
    console.log(`Number of students: ${countByField.SWE.length + countByField.CS.length}`);
    console.log(`Number of students in CS: ${countByField.CS.length}. List: ${countByField.CS.join(', ')}`);
    console.log(`Number of students in SWE: ${countByField.SWE.length}. List: ${countByField.SWE.join(', ')}`);
  } catch (err) {
    throw new Error('Cannot load the database');
  }
}
module.exports = countStudents;
