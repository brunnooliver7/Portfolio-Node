const Medico = require('../src/app/models/medico');
const Prescricao = require('../src/app/models/prescricao');
const jwt = require('jsonwebtoken');
const authConfig = require('../src/config/auth.json');

const medicos = criarMedicos();
const tokens = criarTokens();
const prescricoes = criarPrescricoes();

function criarMedicos() {

    const medico1 = new Medico();
    medico1.nome = "André Carvalho";
    medico1.email = "andre@gmail.com";
    medico1.cpf = "111.111.111-11";
    medico1.dataNascimento = "01-01-1900";
    medico1.crm = "1234";
    medico1.estadoRegistroCRM = "ativo";
    medico1.sexo = "M";
    medico1.password = "senha1";
    medico1.passwordConfirm = "senha1";
    medico1.createdAt = "01-01-2000";
    
    const medico2 = new Medico();
    medico2.nome = "Bruno";
    medico2.email = "bruno@gmail.com";
    medico2.cpf = "222.222.222-22";
    medico2.dataNascimento = "02-01-1900";
    medico2.crm = "5678";
    medico2.estadoRegistroCRM = "ativo";
    medico2.sexo = "M";
    medico2.password = "senha2";
    medico2.passwordConfirm = "senha2";
    medico2.createdAt = "02-01-2000";
        
    return Array(medico1, medico2);
}

function criarTokens() {
    const medicos = criarMedicos();
    const [medico1, medico2] = medicos;
    const token1 = generateToken({ id: medico1.id })
    const token2 = generateToken({ id: medico2.id })
    return Array(token1, token2);
}

function generateToken(params = {}) {
    return jwt.sign(params, authConfig.secret, {
        expiresIn: 86400,
    });
}

function criarPrescricoes() {
    
    const prescricao1 = new Prescricao();
    prescricao1.idMedico = medicos[1]._id;
    prescricao1.nomePaciente = "Caio Silva";
    prescricao1.cpfPaciente = "333.333.333-33";
    prescricao1.dataNascimentoPaciente = "03-01-1900";
    prescricao1.medicamentos = [
        {
            descricao: "descricao 1",
            quantidade: 1,
            dosagem: "dosagem 1",
            frequenciaUso: "frequencia 1"
        }
    ];
    
    const prescricao2 = new Prescricao();
    prescricao2.idMedico = medicos[1]._id;
    prescricao2.nomePaciente = "Daniel Alves";
    prescricao2.cpfPaciente = "444.444.444-44";
    prescricao2.dataNascimentoPaciente = "04-01-1900";
    prescricao2.medicamentos = [
        {
            descricao: "descricao 2",
            quantidade: 2,
            dosagem: "dosagem 2",
            frequenciaUso: "frequencia 2"
        },
        {
            descricao: "descricao 3",
            quantidade: 3,
            dosagem: "dosagem 3",
            frequenciaUso: "frequencia 3"
        }
    ];

    return Array(prescricao1, prescricao2);
}

module.exports = { medicos, tokens, prescricoes }