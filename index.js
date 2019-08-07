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
        message: 'Failed to get users'
      })
    })
})

// LISTEN
server.listen(4000, () => {
  console.log('Server is running on port 4000...')
})
