const express = require('express');
const app = express.Router();

const contactService = require('../services/contact.service');

app.get('/', (req, res) => {
  contactService.getContacts(req, res);
});

app.get('/:id', (req, res) => {
  contactService.getById(req, res);
});

app.post('/', (req, res) => {
  contactService.postContact(req, res);
});

app.put('/:id', (req, res) => {
  contactService.updateContact(req, res);
});

app.delete('/:id', (req, res) => {
  contactService.deleteContact(req, res);
});

module.exports = app;
