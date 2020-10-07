const express = require('express');
const cors = require('./app/middlewares/cors')

const routes = express.Router();
const ProfessorController = require('./app/controllers/ProfessorController')

routes.use(cors);
routes.get('/professores', ProfessorController.list)

module.exports = routes