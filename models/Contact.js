var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Define um schema e uma collection para contatos
var Contact = new Schema({
  name: {
    type: String
  },
  email: {
    type: String
  },
  phone: {
    type: String
  },
  dateBorn: {
    type: String
  }
},{
    collection: 'contacts'
});

module.exports = mongoose.model('Contact', Contact);