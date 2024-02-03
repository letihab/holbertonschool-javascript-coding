import { readDatabase } from '../utils';

export default class StudentsController {
  static async getAllStudents(req, res) {
    const messageIntro = 'This is the list of our students';
    
    try {
      const fields = await readDatabase(process.argv[2]);
      const orderedFields = Object.keys(fields).sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));

      res.status(200).send(`${messageIntro}\n${orderedFields.map(field => {
        const { count, list } = fields[field];
        return `Number of students in ${field}: ${count}. List: ${list.join(', ')}`;
      }).join('\n')}`);
    } catch (error) {
      res.status(500).send(`${messageIntro}\n${error.message}`);
    }
  }

  static async getAllStudentsByMajor(req, res) {
    const { major } = req.params;
    const messageIntro = `List:`;
    
    if (major !== 'CS' && major !== 'SWE') {
      res.status(500).send('Major parameter must be CS or SWE');
      return;
    }

    try {
      const fields = await readDatabase(process.argv[2]);
      const students = fields[major].list;

      res.status(200).send(`${messageIntro} ${students.join(', ')}`);
    } catch (error) {
      res.status(500).send(`${messageIntro}\n${error.message}`);
    }
  }
}
