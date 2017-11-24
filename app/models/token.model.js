'use strict'
const Sequelize = require('sequelize')
const sequelize = require('../utils/connection')

module.exports = sequelize.define('token', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  user: Sequelize.STRING(100),
  token: Sequelize.STRING(100)
}, {
  tableName: 'blog_token',
  updatedAt: false,
  createdAt: false
})
