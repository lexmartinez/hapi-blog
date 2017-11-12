const Boom = require('boom')
const utils = require('../utils')

module.exports = {
  list: (model, request, reply) => {
    model.findAll().then(tags => {
      reply(tags)
    }).catch(error => {
      reply(Boom.badImplementation(error))
    })
  },
  find: (model, request, reply) => {
    model.findById(encodeURIComponent(request.params.id))
      .then(tag => {
        if (tag.id) {
          reply(tag)
        } else {
          reply(Boom.notFound())
        }
      }).catch(error => {
        reply(Boom.badImplementation(error))
      })
  },
  store: (model, request, reply) => {
    model.create(request.payload)
      .then(tag => {
        reply(tag)
      }).catch(error => {
        reply(Boom.badImplementation(error))
      })
  },
  update: (model, request, reply) => {
    model.update(request.payload, {where: {
      id: encodeURIComponent(request.params.id)
    }}).then((tag) => {
      reply(utils.success)
    }).catch(error => {
      reply(Boom.badImplementation(error))
    })
  },
  delete: (model, request, reply) => {
    model.destroy({where: {
      id: encodeURIComponent(request.params.id)
    }}).then(tag => {
      if (tag === 0) {
        reply(Boom.notFound())
      } else {
        reply(utils.success)
      }
    }).catch(error => {
      reply(Boom.badImplementation(error))
    })
  }
}
