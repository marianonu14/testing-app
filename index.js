const express = require('express');
const app = express();
const cors = require('cors');
let persons = require('./persons.js');

app.use(cors());
app.use(express.json());
app.use(express.static('build'));

app.get('/', (req, res) => {
  res.send('Api Persons');
});

app.get('/api/persons', (req, res) => {
  res.send(persons);
});

app.get('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id);
  const person = persons.find((elem) => elem.id === id);

  if (!person) return res.status(404).send('Person with this ID, Doesnt Exist');

  res.send(person);
});

app.post('/api/persons', (req, res) => {
  const id = parseInt(Math.random() * 100);
  const { name, number } = req.body;

  if (!name || !number)
    return res.status(404).send('Name and Number is Required');

  const isUnique = persons.find((person) => person.name === name);

  if (isUnique) return res.status(404).send('Name Must be Unique');

  const newPerson = { name, number, id };

  persons = [...persons, newPerson];

  res.send(persons);
});

app.put('/api/persons/:id', (req, res) => {
  const { number } = req.body;
  const id = Number(req.params.id);
  const person = persons.find((elem) => elem.id === id);

  if (!person) return res.status(404).send('Person with this ID, Doesnt Exist');

  const updatePerson = {
    ...person,
    number: number,
  };

  persons = persons.map((elem) => (elem.id !== id ? elem : updatePerson));

  res.send(persons);
});

app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id);
  const person = persons.find((elem) => elem.id === id);

  if (!person) return res.status(404).send('Person with this ID, Doesnt Exist');

  persons = persons.filter((elem) => elem.id !== id);

  res.send(persons);
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
