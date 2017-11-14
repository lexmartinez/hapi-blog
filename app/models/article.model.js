'use strict'
const Sequelize = require('sequelize')
const sequelize = require('../utils/connection')
// const tag = require('./tag.model')
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
  content: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  imageUrl: {
    type: Sequelize.TEXT,
    allowNull: false,
    field: 'image_url'
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

// article.belongsToMany(tag, {as: 'tags',
//   through: 'blog_tag_article', foreignKey: 'article_id'})
//
// tag.belongsToMany(article, {as: 'articles',
//   through: 'blog_tag_article',foreignKey: 'tag_id'})

module.exports = article
