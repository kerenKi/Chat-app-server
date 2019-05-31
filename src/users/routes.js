//Importing from express
const { Router } = require('express')
//Importing the user model from model file
const User = require('./model')


const router = new Router()

router.post('/login', (req, res, next) => {
  User
    .create(req.body)
    .then( user => {
      if (!user) {
        return res.status(404).send({
          message: 'could not find the user'
        })
      }
      return res.status(201).send(user)
    })
    .catch(next)    
})

module.exports = router