var mongoose = require('mongoose');

var contactSchema = mongoose.Schema(
  {
    name: String,
    email: String,
    phone: String,
    website: String
  },
  { collection: 'Contacts' }
);

var Contact = mongoose.model('Contact', contactSchema);

module.exports = Contact;
