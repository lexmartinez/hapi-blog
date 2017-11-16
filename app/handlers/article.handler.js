const base = require('./base.handler')
const model = require('../models/article.model')
const Boom = require('boom')
const async = require('asyncawait/async');
const await = require('asyncawait/await');
const author = require('../models/author.model')

module.exports = {
  list: async (request, reply) => {
    if (request.query.key) {
      const article = await (model.findOne({where:{key:request.query.key}, attributes: {exclude: ['deletedAt']}}))
      if (article && article.id) {
        const tags = await (article.getTags());
        const auth = await (author.findById(article.getDataValue('author_id'), {attributes: {exclude: ['deletedAt']}}))
        article.setDataValue('author', auth);
        article.setDataValue('tags',tags)
        article.setDataValue('author_id', undefined)
        reply(article)
      } else {
        reply(Boom.notFound())
      }
    } else {
      base.list(model, request, reply)
    }
  },
  /* eslint-enable */
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
  tags: (request, reply) => {
    model.findById(encodeURIComponent(request.params.id), {attributes: {exclude: ['deletedAt']}})
      .then(article => {
        if (article && article.id) {
          reply(article.getTags({attributes: {exclude: ['deletedAt']}}))
        } else {
          reply(Boom.notFound())
        }
      }).catch(error => {
        reply(Boom.badImplementation(error))
      })
  },
  comments: (request, reply) => {
    model.findById(encodeURIComponent(request.params.id), {attributes: {exclude: ['deletedAt']}})
      .then(article => {
        if (article && article.id) {
          reply(article.getComments({attributes: {exclude: ['deletedAt']}}))
        } else {
          reply(Boom.notFound())
        }
      }).catch(error => {
        reply(Boom.badImplementation(error))
      })
  }
}
