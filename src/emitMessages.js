//Message is the table messages id the db:
const Message = require('./messages/model')

function emitMessages () {
  Message
  .findAll()
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
