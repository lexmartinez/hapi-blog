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
    set (val) {
      this.setDataValue('name', val.toLowerCase())
    }
  }
}, {
  paranoid: true,
  underscored: true,
  tableName: 'blog_tag',
  updatedAt: false
})
