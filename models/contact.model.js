var mongoose = require('mongoose');

var contactSchema = mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    email: String,
    phone: String,
    website: String
  },
  { collection: 'Contacts' }
);

var Contacts = mongoose.model('Contact', contactSchema);

module.exports = Contacts;
