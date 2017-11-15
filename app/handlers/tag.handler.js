'use strict'
const model = require('../models/tag.model')
const base = require('./base.handler')
const Boom = require('boom')

module.exports = {
  list: (request, reply) => {
    base.list(model, request, reply)
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
    base.delete((model, request, reply))
  },
  articles: (request, reply) => {
    model.findById(encodeURIComponent(request.params.id), {attributes: {exclude: ['deletedAt']}})
      .then(tag => {
        if (tag && tag.id) {
          reply(tag.getArticles({attributes: {exclude: ['deletedAt']}}))
        } else {
          reply(Boom.notFound())
        }
      }).catch(error => {
        reply(Boom.badImplementation(error))
      })
  }
}
