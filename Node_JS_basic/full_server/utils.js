import fs from 'fs/promises';

export function readDatabase(filePath) {
  return fs.readFile(filePath, 'utf8')
    .then(data => {
      const lines = data.trim().split('\n');

      if (lines.length <= 1) {
        throw new Error('No valid students in the database');
      }

      const header = lines[0].split(',');
      const students = lines.slice(1).map(line => line.split(','));

      const fieldIndex = header.indexOf('field');
      if (fieldIndex === -1) {
        throw new Error('Invalid CSV format: "field" column not found');
      }

      const fields = {};

      students.forEach(student => {
        const [firstname, lastname, age, field] = student.map(item => item.trim());

        if (field in fields) {
          fields[field].count += 1;
          fields[field].list.push(firstname);
        } else {
          fields[field] = { count: 1, list: [firstname] };
        }
      });

      return fields;
    })
    .catch(error => {
      throw new Error('Cannot load the database');
    });
}
