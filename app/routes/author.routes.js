'use strict'
const handler = require('../handlers/author.handler')
const prefix = '/authors'

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
    path: prefix + '/{id}/articles',
    handler: handler.articles
  }
  // ,
  // {
  //   method: 'POST',
  //   path: prefix,
  //   handler: handler.store
  // },
  // {
  //   method: ['PUT', 'PATCH'],
  //   path: prefix + '/{id}',
  //   handler: handler.update
  // },
  // {
  //   method: 'DELETE',
  //   path: prefix + '/{id}',
  //   handler: handler.delete
  // }
]
