const Message = require('./messages/model')
const User = require('./users/model')

function emitMessages () {
  Message
  .findAll({
    include:[{ model: User, attributes: ['user_name'] }]
  })
  .then(messages => {
     const action = {
       type: 'MESSAGES',
       payload: messages
     }
     //emit sends to all the client the object of action with the name 'action'
     //socketset in the front end will make this emit a legit action and send it to the reducer
     global.io.emit('action',action)
  })
}

module.exports = emitMessages
