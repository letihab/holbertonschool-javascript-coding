import routes from './routes';
const express = require('express');

const app = express();

app.use('/', routes);
app.listen(1245);

module.exports = app;
