const express = require('express');
const router = express.Router();
const Medico = require('../models/medico');
const Prescricao = require('../models/prescricao');
const auth = require('../middlewares/auth')

router.use(auth);

router.get('/find/:idMedico', find);
router.get('/findOne/:idPrescricao', findOne);
router.post('/save', save);
router.patch('/update/:id', update);
router.delete('/delete/:id', remove);

async function find(req, res, next) {
    try {
        const idMedico = req.params.idMedico;
        const prescricoes = await Prescricao.find({idMedico});
        res.send(prescricoes);
    } catch (error) {
        return res.status(404).send('Error on ID');
    }
}

async function findOne(req, res, next) {
    try {
        const idPrescricao = req.params.idPrescricao;
        const prescricao = await Prescricao.findById(idPrescricao);
        const data = Array(prescricao);
        res.status(200).send(data);
    } catch (error) {
        res.status(400).send({error: "Bad request"});
    }
}

async function save(req, res, next) {
    try {
        const medico = await Medico.findById(req.body.idMedico);
        var prescricao = req.body;
        prescricao["nomeMedico"] = medico.nome;
        prescricao["cpfMedico"] = medico.cpf;
        prescricao["crm"] = medico.crm;
        prescricao["estadoRegistroCRM"] = medico.estadoRegistroCRM;
        prescricao = await Prescricao.create(prescricao);
        res.send(prescricao);
    } catch (error) {
        return res.status(400).send({ error: 'Fail on register'});
    }
}

async function update(req, res, next) {
    try {
        const id = req.params.id;
        const prescricao = await Prescricao.findById(id);
        const body = req.body;
        await prescricao.updateOne(body);
        res.status(200).send({"message": "Object updated successfully"})
    } catch (error) {
        res.status(400).send({error: "Fail on update"});
    }
}

async function remove(req, res, next) {
    try {
        const idPrescricao = req.params.id;
        const prescricao = await Prescricao.findById(idPrescricao);

        if (!prescricao)
            return res.status(400).send({error: "Object does not exist"});

        await Prescricao.deleteOne(prescricao);
        res.status(200).send({ message: 'Object deleted successfully' })
    } catch (error) {
        res.status(400).send({error: "Internal server error"});
    }
}

module.exports = router;