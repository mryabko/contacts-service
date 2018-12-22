const Contact = require('../models/contact.model');
const Joi = require('joi');

require('../mongo')
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
  const query = Contact.find({});
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

function postContact(req, res) {
  const { error } = validateContact(req.body);

  if (error) return res.status(400).send(error.details[0].message);

  const c = {
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    website: req.body.website
  };

  const contact = new Contact(c);

  contact
    .save()
    .then(result => {
      res.status(201).json(result);
    })
    .catch(error => {
      res.status(500).json(error);
      return;
    });
}

function updateContact(req, res) {
  const { error } = validateContact(req.body);

  if (error) return res.status(400).send(error.details[0].message);

  Contact.findByIdAndUpdate(req.params.id, { $set: req.body })
    .then(c => {
      res.status(200).json(c);
    })
    .catch(error => {
      res.status(500).json(error);
      return;
    });
}

function deleteContact(req, res) {
  Contact.findByIdAndDelete(req.params.id)
    .then(c => {
      res.status(200).json(c);
    })
    .catch(error => {
      res.status(500).json(error);
      return;
    });
}

function getById(req, res) {
  const query = Contact.findById(req.params.id);
  query
    .exec()
    .then(c => {
      res.status(200).json(c);
    })
    .catch(error => {
      res.status(500).json(error);
      return;
    });
}

function validateContact(contact) {
  const schema = {
    name: Joi.string()
      .min(3)
      .required(),
    email: Joi.string()
      .min(3)
      .required()
      .email(),
    phone: Joi.string()
      .min(3)
      .required(),
    website: Joi.string()
  };

  return Joi.validate(contact, schema);
}

module.exports = {
  getContacts,
  postContact,
  updateContact,
  deleteContact,
  getById
};
