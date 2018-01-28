const Boom = require('boom')
const utils = require('../utils')
const auth = require('./auth.handler')

module.exports = {
  list: (model, request, reply) => {
    let options = {attributes: {exclude: ['deletedAt']}}
    if (request.query.limit) {
      options = {
        offset: Number(request.query.offset || '0'),
        limit: Number(request.query.limit),
        attributes: {exclude: ['deletedAt']}
      }
    }
    model.findAndCountAll(options).then(response => {
      const res = reply(response.rows)
      res.header('x-total-rows', response.count)
      res.header('Access-Control-Expose-Headers', 'x-total-rows')
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
