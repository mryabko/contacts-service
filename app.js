const express = require('express');
const Joi = require('joi');

const app = express();
const contactService = require('./contact.service');

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Welcome to Node js Contacts API test');
});

app.get('/api/contacts', (req, res) => {
  contactService.getContacts(req, res);
});

app.get('/api/contacts/:id', (req, res) => {
  // req.query is to get variables from query string
  // req.params is to get values from url when params are part of the url but not query string
  const contact = contacts.find(c => c.id === parseInt(req.params.id));

  if (!contact)
    return res.status(404).send('The contact with given id was not found');
  res.send(contact);
});

app.post('/api/contacts', (req, res) => {
  const { error } = validateContact(req.body);

  if (error) return res.status(400).send(error.details[0].message);

  const contact = {
    id: contacts.length + 1,
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    website: req.body.website
  };

  contacts.push(contact);
  res.send(contact);
});

app.put('/api/contacts/:id', (req, res) => {
  const contact = contacts.find(c => c.id === parseInt(req.params.id));

  if (!contact)
    return res.status(404).send('The contact with given id was not found');

  const { error } = validateContact(req.body);

  if (error) return res.status(400).send(error.details[0].message);

  contact.name = req.body.name;
  contact.email = req.body.email;
  contact.phone = req.body.phone;
  contact.website = req.body.website;

  res.send(contact);
});

app.delete('/api/contacts/:id', (req, res) => {
  const contact = contacts.find(c => c.id === parseInt(req.params.id));

  if (!contact)
    return res.status(404).send('The contact with given id was not found');

  const index = contacts.indexOf(contact);
  contacts.splice(index, 1);

  res.send(contact);
});

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

// PORT

const port = process.env.port || process.env.PORT || 3000;

app.listen(port, () => console.log(`Listening on port ${port}`));
