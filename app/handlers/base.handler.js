const Boom = require('boom')
const utils = require('../utils')
const auth = require('./auth.handler')

module.exports = {
  list: (model, request, reply) => {
    model.findAll({attributes: {exclude: ['deletedAt']}}).then(objects => {
      reply(objects)
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
    const token = request.headers['x-auth-token']
    if (token) {
      auth.check(token).then((val) => {
        if (val) {
          model.create(request.payload)
            .then(obj => {
              reply(obj)
            }).catch(error => {
              reply(Boom.internal(error))
            })
        } else {
          reply(Boom.unauthorized())
        }
      }).catch((error) => reply(Boom.internal(error)))
    } else {
      reply(Boom.unauthorized())
    }
  },
  update: (model, request, reply) => {
    const token = request.headers['x-auth-token']
    if (token) {
      auth.check(token).then((val) => {
        if (val) {
          model.update(request.payload, {where: {
            id: encodeURIComponent(request.params.id)
          }}).then((obj) => {
            reply(utils.success)
          }).catch(error => {
            reply(Boom.internal(error))
          })
        } else {
          reply(Boom.unauthorized())
        }
      }).catch((error) => reply(Boom.internal(error)))
    } else {
      reply(Boom.unauthorized())
    }
  },
  delete: (model, request, reply) => {
    console.log(model)
    const token = request.headers['x-auth-token']
    if (token) {
      auth.check(token).then((val) => {
        if (val) {
          model.destroy({where: {
            id: encodeURIComponent(request.params.id)
          }}).then(obj => {
            if (obj === 0) {
              reply(Boom.notFound())
            } else {
              reply(utils.success)
            }
          }).catch(error => {
            reply(Boom.internal(error))
          })
        } else {
          reply(Boom.unauthorized())
        }
      }).catch((error) => reply(Boom.internal(error)))
    } else {
      reply(Boom.unauthorized())
    }
  }
}
