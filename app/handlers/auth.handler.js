'use strict'
const Boom = require('boom')
const sha1 = require('sha1');
const model = require('../models/token.model')
const user = require('../models/user.model')
const async = require('asyncawait/async')
const await = require('asyncawait/await')
const utils = require('../utils')

module.exports = {
  login: async (request, reply) => {
    const record = await (user.findOne({where:{username: request.payload.username}}))
    console.log(record)
    if(record && record.id && record.password === sha1(request.payload.password)){
      const current_date = (new Date()).valueOf().toString();
      const random = Math.random().toString();
      const token = sha1(current_date + random);

      model
        .build({ token, user: request.payload.username })
        .save()
        .then((response) => {
          reply(response)
        })
        .catch(error => {
          console.log(error)
          reply(Boom.internal(error));
        })
    } else {
      reply(Boom.unauthorized());
    }
  },
  check: async (token) => {
    const query = await (model.findOne({where:{token}}))
    if(query && query.id && query.user){
      return true;
    }
    return false;
  },
  validate: async (request, reply) => {
    const query = await (model.findOne({where:{token: request.params.token}}))
    if(query && query.id && query.user){
      reply(utils.success)
      return;
    }
    reply(Boom.unauthorized())
  },
  logout: async (request, reply) => {
    const query = await (model.findOne({where:{token: request.params.token}}))
    if(query && query.id && query.user){
      query.destroy();
      reply(utils.success)
      return;
    }
    reply(Boom.unauthorized())
  }
}