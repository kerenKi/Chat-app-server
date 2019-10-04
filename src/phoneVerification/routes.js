const { Router } = require('express')
const User = require('../users/model')
const { toJWT } = require('../auth/jwt')


// Load configuration from .env file
require('dotenv').config();

// Load and initialize MesageBird SDK
const messagebird = require('messagebird')(process.env.MESSAGEBIRD_API_KEY);

const router = new Router()

router.post('/verify', function(req, res) {
  const email = req.body.email 
  // Compose number from country code and number
  const number = req.body.country_code
      + (req.body.phone_number[0] == '0'
          ? req.body.phone_number.substring(1)
          : req.body.phone_number);

  User.findOne({
        where: {
          email
        }
      }).then(entity => {
         // Create verification request with MessageBird Verify API
        messagebird.verify.create(number, {
        type : 'tts', // TTS = text-to-speech, otherwise API defaults to SMS
        template : "Your account security code is %token."
        }, function(err, response) {
          if (err) {
            // Something went wrong
            res.send({ error : "Could not initiate call." })
          } else {
            // API request was successful, call is on its way
            res.send({
              mbId: response.id,
              userId : entity.id
            })
          }
      })
    })
})


router.post('/confirm', function(req, res) {
  const userId = req.body.userId
  // Complete verification request with MessageBird Verify API
  messagebird.verify.verify(req.body.mbId, req.body.code,
      function(err, response) {
          if (err) {
              // Something went wrong
              console.log(err);
              res.send({ error : "Verification has failed. Please try again." });
          } else {
              // Confirmation was successful
              User
              .findOne({
                where: {
                  id:userId
                }
              }).then(entity => {
                if (!entity) {
                    res.status(400).send({
                    message:'Could not find a user with that id'
                  })
                } 
                return res.send({
                  jwt: toJWT({ userId: entity.id }),
                  user_name: entity.user_name
                }) 
              })
          }
      });
});

module.exports = router