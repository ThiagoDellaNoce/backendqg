var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Define um schema e uma collection para contatos
var Comanda = new Schema({
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
    collection: 'comandas'
});

module.exports = mongoose.model('Comanda', Comanda);