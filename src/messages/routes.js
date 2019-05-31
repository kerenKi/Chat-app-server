//Importing from express
const { Router } = require('express')
//Importing the user model from model file
const Message = require('./model')
// importing the emit function
const emitMessages = require('../emitMessages')


const router = new Router()

router.post('/message', (req, res, next) => {
  Message
    .create(req.body)
    .then( message => {
      if (!message) {
        return res.status(404).send({
          message: 'could not find the message'
        })
      }
      emitMessages()
      return res.status(201).send(message)
    })
    .catch(next)    
})

module.exports = router