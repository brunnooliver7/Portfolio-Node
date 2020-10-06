const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const MedicoSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        lowercase: true,
        required: true,
    },
    cpf: {
        type: String,
        unique: true,
        required: true
    },
    dataNascimento: {
        type: Date,
        required: true
    },
    crm: {
        type: String,
        unique: true,
        required: true
    },
    estadoRegistroCRM: {
        type: String,
        required: true
    },
    sexo: {
        type: String,
        required: true
    },
    password: { 
        type: String,
        required: true,
        select: false,
    },
    passwordConfirm: { 
        type: String,
        required: true,
        select: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

MedicoSchema.pre('save', async function(next) {
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
    next();
});

const Medico = mongoose.model('Medico', MedicoSchema);

module.exports = Medico;