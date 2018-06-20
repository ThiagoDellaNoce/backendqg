var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Define um schema e uma collection para contatos
var Registro = new Schema({
  name: {
    type: String
  },
  mesa: {
    type: String
  },
  consumidos: {
    type: String
  },
  pago: {
    type: boolean
  }
},{
    collection: 'registros'
});

module.exports = mongoose.model('Registro', Registro);