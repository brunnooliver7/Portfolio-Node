// Test tools
const chai = require('chai');
const assert = chai.assert;
const expect = chai.expect;
const should = chai.should();
const chaiHttp = require('chai-http');
const request = require('supertest');
chai.use(chaiHttp);

// Configs
// process.env.NODE_ENV = 'test';
const app = require('../src/app.js')
const conn = require('../src/config/database.js');

// Data to test
const {medicos, tokens, prescricoes} = require('./data.js');

before((done) => {
    conn.connect()
        .then(() => done())
        .catch((err) => done(err));
})

after((done) => {
    conn.close()
        .then(() => done())
        .catch((err) => done(err));
})

describe('Médicos', () => {
    
    it('POST', done => {
        request(app)
        .post('/medico/save')
        .set("Authorization", 'Bearer ' + tokens[0])
        .send(medicos[0])
            .then((res) => {
                const body = res.body;
                res.should.have.status(200);
                expect(body).to.have.property('medico').to.have.property('_id');
                expect(body).to.have.property('medico').to.have.property('nome');
                expect(body).to.have.property('medico').to.have.property('email');
                expect(body).to.have.property('medico').to.have.property('cpf');
                expect(body).to.have.property('medico').to.have.property('dataNascimento');
                expect(body).to.have.property('medico').to.have.property('crm');
                expect(body).to.have.property('medico').to.have.property('estadoRegistroCRM');
                expect(body).to.have.property('medico').to.have.property('sexo');
                expect(body).to.have.property('token');
                // done();
            })
            .catch((err) => {
                done(err)
            });
        request(app)
        .post('/medico/save')
        .set("Authorization", 'Bearer ' + tokens[1])
        .send(medicos[1])
            .then((res) => {
                const body = res.body;
                res.should.have.status(200);
                expect(body).to.have.property('medico').to.have.property('_id');
                expect(body).to.have.property('medico').to.have.property('nome');
                expect(body).to.have.property('medico').to.have.property('email');
                expect(body).to.have.property('medico').to.have.property('cpf');
                expect(body).to.have.property('medico').to.have.property('dataNascimento');
                expect(body).to.have.property('medico').to.have.property('crm');
                expect(body).to.have.property('medico').to.have.property('estadoRegistroCRM');
                expect(body).to.have.property('medico').to.have.property('sexo');
                expect(body).to.have.property('token');
                done();
            })
            .catch((err) => {
                done(err)
            });
    });

    it('GET list', done => {
        request(app)
        .get('/medico/find')
        .set("Authorization", 'Bearer ' + tokens[0])
            .then((res) => {
                    res.should.have.status(200);
                    res.should.be.json;
                    res.body.should.be.a('array');
                    expect(res.body).to.have.length(2);
                    done();                        
            })
            .catch((err) => {
                done(err)
            });
    });
 
    it('GET by id', done => {
        request(app)
        .get('/medico/find/' + medicos[0]._id)
        .set("Authorization", 'Bearer ' + tokens[0])
            .then((res) => {
                res.should.have.status(200);
                res.should.be.json;
                expect(res.body).to.have.length(1);
                // done();
            })
            .catch((err) => {
                done(err)
            });
        request(app)
        .get('/medico/find/' + medicos[1]._id)
        .set("Authorization", 'Bearer ' + tokens[1])
            .then((res) => {
                res.should.have.status(200);
                res.should.be.json;
                expect(res.body).to.have.length(1);
                done();
            })
            .catch((err) => {
                done(err)
            });
    });

    it('PATCH', done => {
        request(app)
        .patch('/medico/update/' + medicos[0]._id)
        .set("Authorization", 'Bearer ' + tokens[0])
        .send({ nome: "NOME ALTERADO" })
            .then((res) => {
                res.should.have.status(200);
                res.should.be.json;
                done();
            })
            .catch((err) => {
                done(err)
            });
    });

    it('DELETE', done => {
        request(app)
        .delete('/medico/delete/' + medicos[0]._id)
        .set("Authorization", 'Bearer ' + tokens[0])
            .then((res) => {
                res.should.have.status(200);
                res.should.be.json;
                done();
            })
            .catch((err) => {
                done(err)
            });
    });

});

describe('Prescrições', () => {
    
    it('POST', done => {
        request(app)
        .post('/prescricao/save')
        .set("Authorization", 'Bearer ' + tokens[1])
        .send(prescricoes[0])
            .then((res) => {
                const body = res.body;
                res.should.have.status(200);
                expect(body).to.have.property('_id');
                expect(body).property('idMedico');
                expect(body).property('nomePaciente');
                expect(body).property('cpfPaciente');
                expect(body).property('dataNascimentoPaciente');
                expect(body).property('medicamentos');
                expect(body).property('nomeMedico');
                expect(body).property('cpfMedico');
                expect(body).property('crm');
                expect(body).property('estadoRegistroCRM');
                // done();
            })
            .catch((err) => {
                done(err)
            });
        request(app)
        .post('/prescricao/save')
        .set("Authorization", 'Bearer ' + tokens[1])
        .send(prescricoes[1])
            .then((res) => {
                const body = res.body;
                res.should.have.status(200);
                expect(body).to.have.property('_id');
                expect(body).property('idMedico');
                expect(body).property('nomePaciente');
                expect(body).property('cpfPaciente');
                expect(body).property('dataNascimentoPaciente');
                expect(body).property('medicamentos');
                expect(body).property('nomeMedico');
                expect(body).property('cpfMedico');
                expect(body).property('crm');
                expect(body).property('estadoRegistroCRM');
                done();
            })
            .catch((err) => {
                done(err)
            });
    });

    it('GET list', done => {
        request(app)
        .get('/prescricao/find/' + medicos[1]._id)
        .set("Authorization", 'Bearer ' + tokens[1])
            .then((res) => {
                    res.should.have.status(200);
                    res.should.be.json;
                    res.body.should.be.a('array');
                    expect(res.body).to.have.length(2);
                    done();                        
            })
            .catch((err) => {
                done(err)
            });
    });
 
    it('GET by id', done => {
        request(app)
        .get('/prescricao/findOne/' + prescricoes[0]._id)
        .set("Authorization", 'Bearer ' + tokens[1])
            .then((res) => {
                res.should.have.status(200);
                res.should.be.json;
                expect(res.body).to.have.length(1);
                done();
            })
            .catch((err) => {
                done(err)
            });
        });

    it('PATCH', done => {
        request(app)
        .patch('/prescricao/update/' + prescricoes[0]._id)
        .set("Authorization", 'Bearer ' + tokens[0])
        .send({ cpfPaciente: "cpf paciente alterado" })
            .then((res) => {
                res.should.have.status(200);
                res.should.be.json;
                done();
            })
            .catch((err) => {
                done(err)
            });
    });

    it('DELETE', done => {
        request(app)
        .delete('/prescricao/delete/' + prescricoes[0]._id)
        .set("Authorization", 'Bearer ' + tokens[0])
            .then((res) => {
                res.should.have.status(200);
                res.should.be.json;
                done();
            })
            .catch((err) => {
                done(err)
            });
    });

});

describe('Autenticação', () => {

    it('Login', done => {
        request(app).post('/authenticate')
        .send({
            email: medicos[1].email,
            password: medicos[1].password
        })
        .then((res) => {
            res.should.have.status(200);
            done();
        })
        .catch((err) => {
            done(err)
        });
    });

});