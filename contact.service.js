const Contacts = require('./contact.model');

require('./mongo')
  .connect()
  .then(
    () => {
      console.log('Connection successful');
    },
    err => {
      console.log('Connection error!');
    }
  );

function getContacts(req, res) {
  const query = Contacts.find({});
  query
    .exec()
    .then(contacts => {
      res.status(200).json(contacts);
    })
    .catch(error => {
      res.status(500).json(error);
      return;
    });
}

module.exports = {
  getContacts
};
