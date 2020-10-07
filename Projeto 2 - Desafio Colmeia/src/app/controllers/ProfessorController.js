const Parse = require('../database/parseConfig');
const Professor = require('../models/professor')

module.exports = {
  async list(req, res) {
    const { nome } = req.query
    var Professores = Parse.Object.extend("Professores");
    var query = new Parse.Query(Professores);
    if (nome) query.matches('nome', new RegExp(`^${nome}`, 'i'))
    var results = await query.find()
    return res.json(results.map(Professor))
  }
}