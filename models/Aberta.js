var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Define um schema e uma collection para contatos
var Aberta = new Schema({
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
    collection: 'abertas'
});

module.exports = mongoose.model('Aberta', Aberta);