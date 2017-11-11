'use strict';
const Hapi = require('hapi');
const corsHeaders = require('hapi-cors-headers');
const dotenv = require('dotenv');
const server = new Hapi.Server();

dotenv.config();
server.connection({
    port: process.env.APP_PORT || 3000,
    routes: {
        cors: true
    }
});

server.ext('onPreResponse', corsHeaders);
server.register({
        register: require('./plugins/routing.plugin.js')
    }, {
        routes: {
            prefix: '/v1'
        }
    }, (err) => {

    if (err) {
        throw err;
    }

    server.start(() => {
        console.log(`Server running at: ${server.info.uri}`);
    });

});