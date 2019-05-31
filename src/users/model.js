const Sequelize = require('sequelize')
const sequelize = require('../../db')

const User = sequelize.define('users', {

  user_name: {
    type: Sequelize.STRING,
    field: 'user_name',
    allowNull: false
  },

  password: {
    type: Sequelize.STRING,
    field: 'password',
  },

  email: {
    type: Sequelize.STRING,
    field: 'email',
  },
  
}, {
  timestamps: false,
  tableName: 'users'
})



module.exports = User