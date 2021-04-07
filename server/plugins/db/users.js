'use strict'

const fp = require('fastify-plugin')

module.exports = fp(async (fastify, opts) => {
    fastify.decorate('users', {
        get: async () => {
            const client = await fastify.pg.connect()
            const { rows } = await client.query('SELECT id, "name", "pass", email FROM users')
            client.release()
            return rows
        },
        getById: async id => {
            const client = await fastify.pg.connect()
            const { rows } = await client.query(
                'SELECT id, "name", "pass", email FROM users WHERE id=$1',
                [id]
            )
            client.release()
            return rows
        },
        isNameExist: async name => {
            const client = await fastify.pg.connect()
            const { rows } = await client.query(
                'SELECT id, "name" FROM users WHERE "name"=$1',
                [name]
            )
            client.release()
            return rows
        },
        isEmailExist: async email => {
            const client = await fastify.pg.connect()
            const { rows } = await client.query(
                'SELECT id, email FROM users WHERE email=$1',
                [email]
            )
            client.release()
            return rows
        }
    })
})
