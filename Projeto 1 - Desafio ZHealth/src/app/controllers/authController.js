const express = require('express');
const router = express.Router();
const Medico = require('../models/medico');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authConfig = require('../../config/auth.json')

router.post('', autenticarMedico);

async function autenticarMedico(req, res, next) {

    const { email, password } = req.body;
    
    const medico = await Medico.findOne({ email }).select('+password');
    
    if (!medico) {
        return res.status(400).send({ error: 'User not found' })
    }
    
    if (!await bcrypt.compare(password, medico.password)) {
        return res.status(400).send({ error: 'Invalid password' })
    }

    medico.password = undefined;

    res.send({ 
        medico, 
        token: generateToken({ id: medico.id }) 
    });

}

function generateToken(params = {}) {
    return jwt.sign(params, authConfig.secret, {
        expiresIn: 86400,
    });
}

module.exports = router;