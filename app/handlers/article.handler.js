const base = require('./base.handler')
const model = require('../models/article.model')

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
  }
}
