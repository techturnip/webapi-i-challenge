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
        err: err,
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
        err: err,
        errorMessage: 'The user information could not be retrieved.'
      })
    })
})

// POST - '/api/users' - Creates a user using the
// information sent inside the request body
server.post('/api/users', (req, res) => {
  const newUser = req.body

  // Check if newUser name and bio are neither
  // 'undefined' nor empty strings
  if (
    newUser.name &&
    newUser.name !== '' &&
    newUser.bio &&
    newUser.bio !== ''
  ) {
    // If the newUser obj is valid, insert into
    // the database or catch error
    db.insert(newUser)
      .then(createdUser => {
        res.status(201).json(createdUser)
      })
      .catch(err => {
        res.status(500).json({
          err: err,
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

// LISTEN
server.listen(4000, () => {
  console.log('Server is running on port 4000...')
})
