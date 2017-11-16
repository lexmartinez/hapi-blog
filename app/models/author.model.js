'use strict'
const Sequelize = require('sequelize')
const sequelize = require('../utils/connection')
const article = require('./article.model')

const author = sequelize.define('author', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: Sequelize.STRING(100),
    allowNull: false
  },
  bio: Sequelize.STRING(100),
  github: {
    type: Sequelize.TEXT,
    validate: { isUrl: true }
  },
  twitter: {
    type: Sequelize.TEXT,
    validate: { isUrl: true }
  },
  avatar: {
    type: Sequelize.TEXT,
    allowNull: false,
    validate: { isUrl: true }
  },
  deletedAt: {
    type: Sequelize.DATE,
    field: 'deleted_at'
  }
}, {
  paranoid: true,
  tableName: 'blog_author',
  updatedAt: false,
  createdAt: false
})

author.hasMany(article, {as: 'articles', foreignKey: 'author_id'})

module.exports = author
