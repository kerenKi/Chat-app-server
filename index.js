const express = require('express')
const socketIo = require('socket.io')
const cors = require('cors')
const bodyParser = require('body-parser')
const AuthRouter = require('./src/auth/routes')
const MessagesRouter = require('./src/messages/routes')
const UserRouter = require('./src/users/routes')
const emitMessages = require('./src/emitMessages')
const phoneValidationRouter =require('./src/phoneVerification/routes')


const app = express()

app
.use(cors())
.use(bodyParser.json())
.use(AuthRouter)
.use(MessagesRouter)
.use(UserRouter)
.use(phoneValidationRouter)


function onListen () {
  console.log(`Listening on port 4000`)
}

const server = app.listen(4000, onListen)
global.io = socketIo.listen(server)


io.on(
  'connection', 
  client => {
  console.log('client.id test: ', client.id)

  const action = {
    type: 'SOCKET_ID',
    payload: client.id
  }
  //emit sends to all the client the object of action with the name 'action'
  //socketset in the front end will make this emit a legit action and send it to the reducer
  global.io.emit('action',action)

  emitMessages()

  client.on(
    'disconnect', 
    () => console.log('disconnect test:', client.id)
  )
})

module.exports = io