'use strict'
const Sequelize = require('sequelize')
const sequelize = require('../utils/connection')

module.exports = sequelize.define('tag', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: Sequelize.STRING(30),
    unique: true,
    allowNull: false,
    validate: { is: ['^([a-z0-9\\-])+', 'g'] },
    set (val) {
      this.setDataValue('name', val.toLowerCase())
    }
  },
  deletedAt: {
    type: Sequelize.DATE,
    field: 'deleted_at'
  }
}, {
  paranoid: true,
  tableName: 'blog_tag',
  updatedAt: false,
  createdAt: false
})
