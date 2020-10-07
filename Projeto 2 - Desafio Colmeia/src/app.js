const routes = require('./routes')
const express = require('express');

class App {
    constructor() {
      this.server = express()
      this.middlewares()
      this.routes()
      this.exceptionHandler()
    }
    middlewares() {
      this.server.use(express.json())
    }
    routes() {
      this.server.use(routes)
    }
    exceptionHandler() {
      this.server.use(async (error, req, res, next) => {
        return res.status(500).json({ error: 'Internal server error' })
      })
    }
}

module.exports = new App().server