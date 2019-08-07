// implement your API here
const express = require('express')
const db = require('./data/db.js')

const server = express()

// middleware
server.use(express.json())

// ================================================|
// REQUEST HANDLERS ===============================|
// ================================================|

// GET - '/' - Basic handle root url
server.get('/', (req, res) => {
  res.send('This is the webapi-i-challenge api')
})

// GET - '/api/users' - Returns an array of all the
// user objects contained in the database
server.get('/api/users', (req, res) => {
  db.find()
    .then(users => {
      res.json(users)
    })
    .catch(err => {
      res.status(500).json({
        err,
        errorMessage: 'The users information could not be retrieved.'
      })
    })
})

// GET - '/api/users/:id' - Returns an object with
// the specified id
server.get('/api/users/:id', (req, res) => {
  const { id } = req.params
  db.findById(id)
    .then(user => {
      user
        ? res.json(user)
        : res
            .status(404)
            .json({ message: 'The user with the specified ID does not exist.' })
    })
    .catch(err => {
      res.status(500).json({
        err,
        errorMessage: 'The user information could not be retrieved.'
      })
    })
})

// POST - '/api/users' - Creates a user using the
// information sent inside the request body
server.post('/api/users', (req, res) => {
  const newUser = req.body
  const { name, bio } = newUser

  // Check if newUser name and bio exist, are strings
  // and have a length > 0
  if (
    name &&
    name.length > 0 &&
    typeof name === 'string' &&
    bio &&
    bio.length > 0 &&
    typeof bio === 'string'
  ) {
    // If the newUser obj is valid, insert into
    // the database or catch error
    db.insert(newUser)
      .then(user => {
        res.status(201).json(user)
      })
      .catch(err => {
        res.status(500).json({
          err,
          errorMessage:
            'There was an error while saving the user to the database'
        })
      })
  } else {
    // If the newUser obj is invalid, respond with
    // status 400 and errorMessage
    res.status(400).json({
      errorMessage: 'Please provide name and bio for the user.'
    })
  }
})

// PUT - '/api/users/:id' - Updates the user with the
// specified id using data from the request body.
// Returns the modified document, NOT the original.
server.put('/api/users/:id', (req, res) => {
  const { id } = req.params
  const updatedUser = req.body
  const { name, bio } = updatedUser

  // Check if updatedUser name and bio exist, are strings
  // and have a length > 0
  if (
    name &&
    name.length > 0 &&
    typeof name === 'string' &&
    bio &&
    bio.length > 0 &&
    typeof bio === 'string'
  ) {
    // If the updatedUser obj is valid, insert into
    // the database or catch error
    db.update(id, updatedUser)
      .then(user => {
        user
          ? res.json(user)
          : res.status(404).json({
              message: 'The user with the specified ID does not exist.'
            })
      })
      .catch(err => {
        res.status(500).json({
          err,
          errorMessage: 'The user information could not be modified'
        })
      })
  } else {
    // If the updatedUser obj is invalid, respond with
    // status 400 and errorMessage
    res.status(400).json({
      errorMessage: 'Please provide name and bio for the user.'
    })
  }
})

// DELETE - '/api/users/:id' - Removes the user with the
// specified id and returns the deleted user.
server.delete('/api/users/:id', (req, res) => {
  const { id } = req.params

  db.remove(id)
    .then(deletedUser => {
      console.log(deletedUser)
      deletedUser
        ? res.json(deletedUser)
        : res.status(404).json({
            message: 'The user with the specified ID does not exist.'
          })
    })
    .catch(err => {
      res
        .status(500)
        .json({ err, errorMessage: 'The user could not be removed' })
    })
})

// LISTEN
server.listen(4000, () => {
  console.log('Server is running on port 4000...')
})
