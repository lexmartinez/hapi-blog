const base = require('./base.handler')
const model = require('../models/article.model')
const Boom = require('boom')
const async = require('asyncawait/async')
const await = require('asyncawait/await')
const author = require('../models/author.model')
const tag = require('../models/tag.model')
const auth = require('./auth.handler')
const utils = require('../utils')

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
      const token = request.headers['x-auth-token']
      let options = {
        attributes: {exclude: ['deletedAt']},
        order: [['publishedAt', 'DESC']],
        // limit: request.query.limit ? Number(request.query.limit) : 10,
        // offset: request.query.offset ? Number(request.query.offset) : 0,
        where: {
          publishedAt: {
            $ne: null
          }
        }
      }

      if (token) {
        const val = await (auth.check(token))
        if (val) {
          options = {
            attributes: {exclude: ['deletedAt']},
            order: [['createdAt', 'DESC']],
            // limit: request.query.limit ? Number(request.query.limit) : 10,
            // offset: request.query.offset ? Number(request.query.offset) : 0
          }
        }
      }

      const articles = await model.findAll(options);

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
  update: async (request, reply) => {
    const token = request.headers['x-auth-token']
    if (token) {
      const val = await (auth.check(token))
      if (val) {
        const update = await (model.update(request.payload, {where: {id: encodeURIComponent(request.params.id)}}))
        let article = {}
        if(update[0] === 1){
          article = await (model.findById(encodeURIComponent(request.params.id)))
        }
        if (article && article.id) {
          const tags = []
          for(let i=0; i<(request.payload.tags || []).length; i++){
            const obj = await (tag.findById(request.payload.tags[i].id))
            tags.push(obj)
          }

          const response = await(article.setTags(tags))
          reply(utils.success)
        } else {
          reply(Boom.internal())
        }
      } else {
        reply(Boom.unauthorized())
      }
    } else {
      reply(Boom.unauthorized())
    }
  },
  delete: (request, reply) => {
    base.delete(model, request, reply)
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
  setTags: async (request, reply) => {
    const article = await (model.findById(encodeURIComponent(request.params.id), {attributes: {exclude: ['deletedAt']}}))
    if (article && article.id) {
      const tags = []
      for(let i=0; i<request.payload.length; i++){
         const obj = await (tag.findById(request.payload[i].id))
         tags.push(obj)
      }
      article.setTags(tags)
      reply(utils.success)
    } else {
      reply(Boom.notFound())
    }
  }
}
