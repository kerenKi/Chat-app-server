const { Router } = require('express')
const Message = require('./model')
const User = require('../users/model')
const emitMessages = require('../emitMessages')
const authorization = require('../auth/middleware')

const router = new Router()

router.post('/message', authorization, (req, res, next) => {
  console.log(req.body)
  console.log('res.locals.user:', res.locals.user)
  if (res.locals.user) {
    const newMessage = {
      userId: res.locals.user.id,
      message: req.body.message
    }
  Message
    .create(newMessage)
    .then( message => {
      console.log('new message:', message)
      if (!message) {
        return res.status(404).send({
          message: 'could not find the message'
        })
      }
      emitMessages()
      return res.status(201).send(message)
    })
    .catch(next)  
  }  
})

module.exports = router