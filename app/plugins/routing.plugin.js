'use strict'
const routes = require('../routes')

exports.register = (server, options, next) => {
  server.route(routes)
  next()
}

exports.register.attributes = {
  name: 'hapi-blog-routing',
  version: '0.0.0'
}
