'use strict'

const
    fp = require('fastify-plugin'),
    { v4: uuidv4 } = require('uuid');

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
                'SELECT COUNT(1) FROM users WHERE "name"=$1',
                [name]
            )
            client.release()
            return rows
        },
        isEmailExist: async email => {
            const client = await fastify.pg.connect()
            const { rows } = await client.query(
                'SELECT COUNT(1) FROM users WHERE email=$1',
                [email]
            )
            client.release()
            return rows
        },
        addUser: async ({ login, email, password} ) => {
            try {
                const client = await fastify.pg.connect()
                const { rows } = await client.query(
                    'INSERT INTO users ( id, "name", email, "pass", deleted_at ) VALUES ($1, $2, $3, $4, DEFAULT ) RETURNING id, "name"',
                    [uuidv4(), login, email, password]
                )
                client.release()
                return rows
            } catch (err) {
                return {error: err}
            }

        }
    })
})
