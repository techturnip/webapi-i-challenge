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

// LISTEN
server.listen(4000, () => {
  console.log('Server is running on port 4000...')
})
