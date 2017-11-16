'use strict'
const Sequelize = require('sequelize')
const sequelize = require('../utils/connection')

module.exports = sequelize.define('comment', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  comment: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  replyTo: {
    type: Sequelize.INTEGER,
    field: 'reply_to'
  }
}, {
  paranoid: true,
  updatedAt: false,
  tableName: 'blog_comment'
})
