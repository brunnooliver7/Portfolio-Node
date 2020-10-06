const express = require('express');
const router = express.Router();
const Medico = require('../models/medico');
const jwt = require('jsonwebtoken');
const authConfig = require('../../config/auth.json')
const auth = require('../middlewares/auth')

// router.use(auth);

router.get('/find', find);
router.get('/find/:id', findOne)
router.post('/save', save);
router.patch('/update/:id', update);
router.delete('/delete/:id', remove);

async function find(req, res, next) {
    try {
        const medicos = await Medico.find();
        res.send(medicos);
    } catch (error) {
        return res.status(400).send({ error: 'Fail on list'});
    }
}

async function findOne(req, res, next) {
    try {
        const id = req.params.id;
        const medico = await Medico.findById(id);
        const data = Array(medico)
        if (medico) {
            res.status(200).send(data);
        }
    } catch (error) {
        res.status(404).send({error: "Not found"});
    }
}

async function save(req, res, next) {

    const email = req.body.email;
    const cpf = req.body.cpf;
    const crm = req.body.crm;
    const password = req.body.password;
    const passwordConfirm = req.body.passwordConfirm;

    try {

        if (await Medico.findOne({ email })) 
            return res.status(400).send({ error: 'The user already exist. Check the email'});
       
        if (await Medico.findOne({ cpf })) 
            return res.status(400).send({ error: 'The user already exist. Check the CPF'});
            
        if (await Medico.findOne({ crm })) 
            return res.status(400).send({ error: 'The user already exist. Check the CRM'});
        
        if (password !== passwordConfirm)
            return res.status(400).send({ error: `The passwords don't match`});

        const medico = await Medico.create(req.body);

        medico.password = undefined;

        res.send({ 
            medico, 
            token: generateToken({ id: medico.id }) 
        });
    
    } catch (error) {
        res.status(400).send({ error: 'Fail on register'});
    }
}

async function update(req, res, next) {
    try {
        const id = req.params.id;
        const medico = await Medico.findById(id);
        const body = req.body;
        await medico.updateOne(body);
        res.status(200).send({message: "User updated successfully"})
    } catch (error) {
        res.status(400).send({error: "Fail on update"});
    }
}

async function remove(req, res, next) {
    try {
        const id = req.params.id;
        const medico = await Medico.findById(id);
        if (!medico) {
            res.status(404).send({error: "The user with the provided ID does not exist"});
        } else {
            await Medico.deleteOne(medico);
            res.status(200).send({ message: 'User deleted successfully' })
        }
    } catch (error) {
        res.status(500).send({error: "Internal server error"});
    }
}

function generateToken(params = {}) {
    return jwt.sign(params, authConfig.secret, {
        expiresIn: 86400,
    });
}

module.exports = router;