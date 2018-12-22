const express = require('express');
const contactRoutes = require('./controllers/contactsController');

const app = express();

app.use(express.json());
app.use('/api/contacts', contactRoutes);

app.get('/', (req, res) => {
  res.send('Welcome to Node js Contacts API test');
});

const port = process.env.port || process.env.PORT || 3000;

app.listen(port, () => console.log(`Listening on port ${port}`));
