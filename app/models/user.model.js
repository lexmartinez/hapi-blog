'use strict'
const Sequelize = require('sequelize')
const sequelize = require('../utils/connection')

module.exports = sequelize.define('user', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  username: Sequelize.STRING(100),
  password: Sequelize.STRING(100)
}, {
  tableName: 'blog_user',
  updatedAt: false,
  createdAt: false
})
