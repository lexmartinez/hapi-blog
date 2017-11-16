'use strict'
const Sequelize = require('sequelize')
const sequelize = require('../utils/connection')
const comment = require('./comment.model')

const reader = sequelize.define('reader', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  email: {
    type: Sequelize.TEXT,
    allowNull: false,
    validate: { isEmail: true }
  },
  avatar: {
    type: Sequelize.TEXT,
    allowNull: false,
    validate: { isUrl: true }
  }
}, {
  paranoid: true,
  updatedAt: false,
  createdAt: false,
  tableName: 'blog_reader'
})

reader.hasMany(comment, {as: 'comments', foreignKey: 'reader_id'})

module.exports = reader
