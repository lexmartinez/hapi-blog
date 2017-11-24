'use strict'
const Boom = require('boom')
const sha1 = require('sha1');
const model = require('../models/token.model')
const async = require('asyncawait/async')
const await = require('asyncawait/await')

module.exports = {
  login: (request, reply) => {
    const users = process.env.ADMIN_USERS.split(',');
    const passwords = process.env.ADMIN_PASSWORDS.split(',');
    const idx = users.indexOf(request.payload.username);
    if(idx !== -1 && passwords[idx] === sha1(request.payload.password)) {

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
      reply({})
      return;
    }
    reply(Boom.unauthorized())
  }
}