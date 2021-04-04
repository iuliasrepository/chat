'use strict'

const fp = require('fastify-plugin')

module.exports = fp(async (fastify, opts) => {
    fastify.register(require('fastify-postgres'), {
        connectionString: 'postgres://postgres:111@localhost/chat_db'
    })

    fastify.register(require('fastify-cors'), {})
})
