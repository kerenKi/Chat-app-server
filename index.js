const express = require('express')
const socketIo = require('socket.io')
const cors = require('cors')
const bodyParser = require('body-parser')
const messagesRouter = require('./src/messages/routes')
const emitMessages = require('./src/emitMessages')

const app = express()

app
.use(cors())
.use(bodyParser.json())
.use(messagesRouter)


function onListen () {
  console.log(`Listening on port 4000`)
}

const server = app.listen(4000, onListen)
global.io = socketIo.listen(server)


io.on(
  'connection', 
  client => {
  console.log('client.id test: ', client.id)

  emitMessages()

  client.on(
    'disconnect', 
    () => console.log('disconnect test:', client.id)
  )
})

module.exports = io