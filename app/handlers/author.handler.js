'use strict'
const model = require('../models/author.model')
const base = require('./base.handler')
const Boom = require('boom')

module.exports = {
  list: (request, reply) => {
    const sort = [[(request.query['sort_column'] || 'name'), (request.query['sort_order'] || 'ASC')]]
    base.list(model, request, reply, sort)
  },
  find: (request, reply) => {
    base.find(model, request, reply)
  },
  store: (request, reply) => {
    base.store(model, request, reply)
  },
  update: (request, reply) => {
    base.update(model, request, reply)
  },
  delete: (request, reply) => {
    base.delete(model, request, reply)
  },
  articles: (request, reply) => {
    model.findById(encodeURIComponent(request.params.id), {attributes: {exclude: ['deletedAt']}})
      .then(author => {
        if (author && author.id) {
          reply(author.getArticles({attributes: {exclude: ['deletedAt']}}))
        } else {
          reply(Boom.notFound())
        }
      }).catch(error => {
        reply(Boom.badImplementation(error))
      })
  }
}
