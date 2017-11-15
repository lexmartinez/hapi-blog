const Boom = require('boom')
const utils = require('../utils')

module.exports = {
  list: (model, request, reply) => {
    model.findAll({attributes: {exclude: ['deletedAt']}}).then(tags => {
      reply(tags)
    }).catch(error => {
      reply(Boom.badImplementation(error))
    })
  },
  find: (model, request, reply) => {
    model.findById(encodeURIComponent(request.params.id), {attributes: {exclude: ['deletedAt']}})
      .then(obj => {
        if (obj && obj.id) {
          reply(obj)
        } else {
          reply(Boom.notFound())
        }
      }).catch(error => {
        reply(Boom.badImplementation(error))
      })
  },
  store: (model, request, reply) => {
    model.create(request.payload)
      .then(obj => {
        reply(obj)
      }).catch(error => {
        reply(Boom.badImplementation(error))
      })
  },
  update: (model, request, reply) => {
    model.update(request.payload, {where: {
      id: encodeURIComponent(request.params.id)
    }}).then((obj) => {
      reply(utils.success)
    }).catch(error => {
      reply(Boom.badImplementation(error))
    })
  },
  delete: (model, request, reply) => {
    model.destroy({where: {
      id: encodeURIComponent(request.params.id)
    }}).then(obj => {
      if (obj === 0) {
        reply(Boom.notFound())
      } else {
        reply(utils.success)
      }
    }).catch(error => {
      reply(Boom.badImplementation(error))
    })
  }
}
