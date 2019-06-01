const Sequelize = require('sequelize')
const sequelize = require('../../db')

//Requiring the user model
const User = require('../users/model')

const Message = sequelize.define('messages', {

  message: {
    type: Sequelize.STRING,
    field: 'message',
    allowNull: false
  },
  userId: {
    type: Sequelize.INTEGER,
    field: 'user_id',
    allowNull: false

  },
  
}, {
  timestamps: false,
  tableName: 'messages'
})

//Specify the relation between messages and users. the messages belongs to a user
// a user can have many messages belonging to it
Message.belongsTo(User,{
  "foreignKey": "user_id",
})

module.exports = Message