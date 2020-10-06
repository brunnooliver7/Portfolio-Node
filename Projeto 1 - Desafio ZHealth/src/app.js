const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./config/routes');
const cors = require('./app/middlewares/cors');
const exceptionHandler = require('./app/middlewares/exceptionHandler');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(routes);
app.use(cors);
app.use(exceptionHandler);

module.exports = app;