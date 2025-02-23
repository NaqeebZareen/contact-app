const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;
const contactsFilePath = path.join(__dirname, 'contacts.json');

app.use(cors());
app.use(bodyParser.json());

// Helper function to read contacts from the JSON file
const readContacts = () => {
  const data = fs.readFileSync(contactsFilePath, 'utf8');
  return JSON.parse(data);
};

// Helper function to write contacts to the JSON file
const writeContacts = (contacts) => {
  fs.writeFileSync(contactsFilePath, JSON.stringify(contacts, null, 2), 'utf8');
};

// Get all contacts
app.get('/api/contacts', (req, res) => {
  const contacts = readContacts();
  res.json(contacts);
});

// Get a single contact by ID
app.get('/api/contacts/:id', (req, res) => {
  const contacts = readContacts();
  const contact = contacts.find((c) => c.id === parseInt(req.params.id));
  if (!contact) {
    return res.status(404).json({ error: 'Contact not found' });
  }
  res.json(contact);
});

// Create a new contact
app.post('/api/contacts', (req, res) => {
  const contacts = readContacts();
  const newContact = {
    id: contacts.length + 1, // Simple ID generation
    name: req.body.name,
    address: req.body.address,
    phone: req.body.phone,
  };
  contacts.push(newContact);
  writeContacts(contacts);
  res.json(newContact);
});

// Update a contact
app.put('/api/contacts/:id', (req, res) => {
  const contacts = readContacts();
  const index = contacts.findIndex((c) => c.id === parseInt(req.params.id));
  if (index === -1) {
    return res.status(404).json({ error: 'Contact not found' });
  }
  contacts[index] = { ...contacts[index], ...req.body };
  writeContacts(contacts);
  res.json(contacts[index]);
});

// Delete a contact
app.delete('/api/contacts/:id', (req, res) => {
  const contacts = readContacts();
  const index = contacts.findIndex((c) => c.id === parseInt(req.params.id));
  if (index === -1) {
    return res.status(404).json({ error: 'Contact not found' });
  }
  const deletedContact = contacts.splice(index, 1)[0];
  writeContacts(contacts);
  res.json(deletedContact);
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});