const express = require('express')
const socketIo = require('socket.io')

const app = express()

app.get('/hello', (req, res) => {
  return res.send('hello world')
})

function onListen () {
  console.log(`Listening on port 4000`)
}

const server = app.listen(4000, onListen)
const io = socketIo.listen(server)

const messages = ['goodbye']

io.on(
  'connection', 
  client => {
  console.log('client.id test: ', client.id)

  const action = {
    type: 'MESSAGES',
    payload: messages
  }

  io.emit('action', action)

  client.on('disconnect', 
  () => console.log('disconnect test:', client.id)
  )
})

