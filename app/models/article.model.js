'use strict'
const Sequelize = require('sequelize')
const sequelize = require('../utils/connection')
const tag = require('./tag.model')
const comment = require('./comment.model')

const article = sequelize.define('article', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  abstract: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  content: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  imageUrl: {
    type: Sequelize.TEXT,
    allowNull: false,
    field: 'image_url',
    validate: { isUrl: true }
  },
  key: {
    type: Sequelize.TEXT,
    allowNull: false,
    validate: { is: ['^([a-z0-9\\-])+', 'g'] },
    unique: true
  },
  publishedAt: {
    type: Sequelize.DATE,
    field: 'published_at'
  },
  deletedAt: {
    type: Sequelize.DATE,
    field: 'deleted_at'
  },
  createdAt: {
    type: Sequelize.DATE,
    field: 'created_at'
  },
  updatedAt: {
    type: Sequelize.DATE,
    field: 'updated_at'
  }
}, {
  paranoid: true,
  tableName: 'blog_article'
})

article.belongsToMany(tag, {as: 'tags', through: 'blog_tag_article', foreignKey: 'article_id'})
tag.belongsToMany(article, {as: 'articles', through: 'blog_tag_article', foreignKey: 'tag_id'})
article.hasMany(comment, {as: 'comments', foreignKey: 'article_id'})

module.exports = article
