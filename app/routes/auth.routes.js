'use strict'
const handler = require('../handlers/auth.handler')
const prefix = '/auth'

module.exports = [
  {
    method: 'POST',
    path: prefix,
    handler: handler.login
  },
  {
    method: 'GET',
    path: prefix + '/{token}',
    handler: handler.validate
  },
  {
    method: 'DELETE',
    path: prefix + '/{token}',
    handler: handler.logout
  }
]
