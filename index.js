const express = require('express');
const app = express();
app.use(express.json())
const usersDb = require('./db/users_db.js')
const Pokemon = require('./db/models/pokemon.js')

// user routes

// GET all users
app.get('/api/users', (request, response) => {
  usersDb.getAll().then(users => {
    response.json(users)
  }).catch(err => console.error(err));
});

// GET single user
app.get('/api/users/:id', (request, response) => {
  usersDb.get(request.params.id).then(user => {
    response.json(user)
  }).catch(err => console.error(err));
});

// CREATE user
app.post('/api/users/', (request, response) => {
  username = request.body.username
  if (!username) {
    response.json({error: "No username provided."})
    return 
  }

  usersDb.create(request.body.username).then(user => {
    response.json(user);
  }).catch(err => console.error(err));
});

// UPDATE user
app.patch('/api/users/:id', (request, response) => {
  id = request.params.id
  updatedName = request.body.username

  if (!updatedName) {
    response.json({error: "No username provided."})
    return 
  }

  usersDb.update(id, updatedName).then(user => {
    response.json(user);
  }).catch(err => console.error(err));
});

// DELETE user
app.delete('/api/users/:id', (request, response) => {
  usersDb.remove(request.params.id).then(res => {
    if (!res.error) {
      response.status(204).end();
    } else {
      response.json(res); // bad input
    }
  }).catch(err => console.error(err));
});

// pokemon routes

// GET all pokemon
app.get('/api/pokemon', (request, response) => {
  Pokemon.find({}).then(pokemon => {
    response.json(pokemon);
  }).catch(err => console.error(err));
});

// GET single pokemon
app.get('/api/pokemon/:id', (request, response) => {
  Pokemon.findById(request.params.id).then(pokemon => {
    response.json(pokemon);
  }).catch(err => console.error(err));
});

// CREATE pokemon
app.post('/api/pokemon', (request, response) => {
  const pokemon = new Pokemon({
    name: request.body.name,
  });

  pokemon.save().then(savedPokemon => {
    response.json(savedPokemon);
  }).catch(err => console.error(err));
});

// UPDATE pokemon
app.patch('/api/pokemon/:id', (request, response) => {
  const { name } = request.body;

  Pokemon.findByIdAndUpdate(
    request.params.id,
    {name},
    {new: true, context: 'query'}
  ).then(updatedPokemon => {
    response.json(updatedPokemon);
  }).catch(err => console.error(err));
});

// DELETE pokemon
app.delete('/api/pokemon/:id', (request, response) => {
  Pokemon.findByIdAndDelete(request.params.id).then(() => {
    response.status(204).end();
  }).catch(err => console.error(err));
});

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' });
};

app.use(unknownEndpoint);

// start the app
const PORT = 3001;
app.listen(PORT);
console.log(`Backend server running on port ${PORT}.`);