const jwt = require('jsonwebtoken')
// the secret should be longer then 32 charecters and be kept in a volt somewhere else and not in the open code.
//Depending on trufic you should chang and refresh your secrets every once in a while
const secret = process.env.JWT_SECRET || 'e9rp^&^*&@9sejg)DSUA)jpfds8394jdsfn,m'

function toJWT(data) {
  return jwt.sign(data, secret, { expiresIn: '3h' })
}

function toData(token) {
  return jwt.verify(token, secret)
}

module.exports = { toJWT, toData }