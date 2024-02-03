function question() {
  process.stdout.write('Welcome to Holberton School, what is your name?\n');
  process.stdin.setEncoding('utf-8');
  process.stdin.on('data', (input) => {
    const name = input.trim(); // Trim to remove leading/trailing whitespace
    process.stdout.write(`Your name is: ${name}\n`);
    process.stdout.write('This important software is now closing\n');
    process.exit(); // Move exit after printing closing message
  });
}

module.exports = question;

if (require.main === module) {
  question();
}
