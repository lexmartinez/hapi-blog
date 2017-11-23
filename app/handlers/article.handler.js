const base = require('./base.handler')
const model = require('../models/article.model')
const Boom = require('boom')
const async = require('asyncawait/async')
const await = require('asyncawait/await')
const author = require('../models/author.model')
const tag = require('../models/tag.model')

module.exports = {
  list: async (request, reply) => {
    if (request.query.key) {
      const article = await (model.findOne({where:{key: request.query.key}, attributes: {exclude: ['deletedAt']}}))
      if (article && article.id) {
        const tags = await (article.getTags({attributes: {exclude: ['deletedAt']}}));
        const auth = await (author.findById(article.getDataValue('author_id'), {attributes: {exclude: ['deletedAt']}}))
        article.setDataValue('author', auth);
        article.setDataValue('tags',tags)
        article.setDataValue('author_id', undefined)
        reply(article)
      } else {
        reply(Boom.notFound())
      }
    } else if (request.query.tag) {
      const tg = await (tag.findOne({where: {name: request.query.tag}, attributes: {exclude: ['deletedAt']}}))
      if (tg && tg.id) {

        const articles = await(tg.getArticles({attributes: {exclude: ['deletedAt']}}))

        for (var i = 0, len = articles.length; i < len; i++) {
          const tags = await (articles[i].getTags({attributes: {exclude: ['deletedAt']}}));
          const auth = await (author.findById(articles[i].getDataValue('author_id'), {attributes: {exclude: ['deletedAt']}}))
          articles[i].setDataValue('author', auth);
          articles[i].setDataValue('tags',tags)
          articles[i].setDataValue('author_id', undefined)
        }

       reply(articles);

      } else {
        reply(Boom.notFound())
      }
    } else {
      const articles = await model.findAll({
        attributes: {exclude: ['deletedAt']},
        order:[['publishedAt', 'DESC']],
        limit: request.query.limit ? Number(request.query.limit) : 10,
        offset: request.query.offset ? Number(request.query.offset) : 0
      });

      for (var i = 0, len = articles.length; i < len; i++) {
        const tags = await (articles[i].getTags());
        const auth = await (author.findById(articles[i].getDataValue('author_id'), {attributes: {exclude: ['deletedAt']}}))
        articles[i].setDataValue('author', auth);
        articles[i].setDataValue('tags',tags)
        articles[i].setDataValue('author_id', undefined)
      }

      const total = await model.count();
      const response = reply(articles);
      response.header('x-total-articles', total)
    }
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
  }
}
