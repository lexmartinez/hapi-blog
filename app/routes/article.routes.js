'use strict'
const handler = require('../handlers/article.handler')
const prefix = '/articles'

module.exports = [
  {
    method: 'GET',
    path: prefix,
    handler: handler.list
  },
  {
    method: 'GET',
    path: prefix + '/{id}',
    handler: handler.find
  },
  {
    method: 'GET',
    path: prefix + '/{id}/tags',
    handler: handler.tags
  },
  {
    method: 'POST',
    path: prefix,
    handler: handler.store
  },
  {
    method: ['PUT', 'PATCH'],
    path: prefix + '/{id}',
    handler: handler.update
  },
  {
    method: 'DELETE',
    path: prefix + '/{id}',
    handler: handler.delete
  },
  {
    method: 'POST',
    path: prefix + '/{id}/tags',
    handler: handler.setTags
  }
]
