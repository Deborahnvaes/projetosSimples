const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Curso = new Schema({
  nome: {
    type: String
  },
  duracao: {
    type: String
  },
  modalidade: {
    type: String
  },
  requisitos: {
    type: String
  }
},{
    collection: 'curso'
});

module.exports = mongoose.model('Curso', Curso);