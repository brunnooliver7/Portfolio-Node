const mongoose = require('mongoose');
const Medico = require('./medico')

const PrescricaoSchema = new mongoose.Schema({
    idMedico: {
        type: mongoose.ObjectId,
        ref: Medico
    },
    nomeMedico: {
        type: String,
        required: true,
    },
    cpfMedico: {
        type: String,
        required: true,
    },
    crm: {
        type: String,
        required: true,
    },
    estadoRegistroCRM: {
        type: String,
        required: true,
    },
    nomePaciente: {
        type: String,
        required: true,
    },
    cpfPaciente: {
        type: String,
        required: true,
    },
    dataNascimentoPaciente: {
        type: Date,
        required: true,
    },
    medicamentos: [{
        descricao : {
            type: String,
        },
        quantidade: {
            type: Number,
        },
        dosagem: {
            type: String,
        },
        frequenciaUso: {
            type: String,
        }
    }]
});

const Prescricao = mongoose.model('Prescricao', PrescricaoSchema);

module.exports = Prescricao;