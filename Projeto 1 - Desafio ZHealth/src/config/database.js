const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

var DB_URI = '';
if (process.env.NODE_ENV) {
  DB_URI = 'mongodb://mongo:27017/docker-node-mongo'
} else {
  DB_URI = 'mongodb://localhost/zhealth';
}

const options = { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true };

function connect() {
  return new Promise((resolve, reject) => {
    if (process.env.NODE_ENV === 'test') {
      const Mockgoose = require('mockgoose').Mockgoose;
      const mockgoose = new Mockgoose(mongoose);
      mockgoose.prepareStorage()
        .then(() => {
          mongoose.connect(DB_URI, options)
            .then((res, err) => {
              if (err) return reject(err);
              resolve();
            })
        })
    } else {
      mongoose.connect(DB_URI, options).then((res, err) => {
        if (err) return reject(err);
        resolve();
      });      
    }
  });
}

mongoose.connection.on('connected', function() {
  console.log('Mongo connected!');
});

mongoose.connection.on('disconnected', function() {
  console.log('Mongo disconnected!');
});

mongoose.connection.on('error', function() {
  console.log('Error on conection!');
});

function close() {
  return mongoose.disconnect();
}

module.exports = { connect, close };