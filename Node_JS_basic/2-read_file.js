const fs = require('fs');

function countStudents(path) {
  try {
    const data = fs.readFileSync(path, 'utf8');
    const lines = data.split('\n').filter(line => line.trim() !== '');

    if (lines.length === 0) {
      throw new Error('No valid students in the database');
    }

    const students = lines.map(line => line.split(','));

    const fields = {};
    students.forEach(student => {
      const [firstname, age, field] = student.map(item => item.trim());

      if (field in fields) {
        fields[field].count += 1;
        fields[field].list.push(firstname);
      } else {
        fields[field] = { count: 1, list: [firstname] };
      }
    });

    console.log(`Number of students: ${students.length}`);
    for (const field in fields) {
      const { count, list } = fields[field];
      console.log(`Number of students in ${field}: ${count}. List: ${list.join(', ')}`);
    }
  } catch (error) {
    throw new Error('Cannot load the database');
  }
}

module.exports = countStudents;
