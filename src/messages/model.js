const Sequelize = require('sequelize')
const sequelize = require('../../db')

const Message = sequelize.define('messages', {

  message: {
    type: Sequelize.STRING,
    field: 'message',
    allowNull: false
  },
  user_id: {
    type: Sequelize.INTEGER,
    field: 'user_id',
  },
  
}, {
  timestamps: false,
  tableName: 'messages'
})



module.exports = Message