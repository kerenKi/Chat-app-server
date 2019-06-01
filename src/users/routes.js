//Importing from express
const { Router } = require('express')
//Importing the user model from model file
const User = require('./model')


const router = new Router()

router.post('/login', (req, res, next) => {
  User
  .findOrCreate({where: {user_name: req.body.user_name, email: req.body.email}, defaults: {password: req.body.password}})
  .then(([user, created]) => {
    console.log(user)
      const action = {
        type: 'USER_LOGIN',
        payload: user
      }
      global.io.emit('action',action)
   })
    
    .catch(next)    
})

module.exports = router