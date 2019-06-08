var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Define um schema e uma collection para contatos
var Arquivada = new Schema({
  name: {
    type: String
  },
  mesa: {
    type: String
  },
  consumidos: {
    type: String
  }
},{
    collection: 'arquivadas'
});

module.exports = mongoose.model('Arquivada', Arquivada);