'use strict'

const
    fp = require('fastify-plugin'),
    { v4: uuidv4 } = require('uuid'),
    crypto = require('crypto')

module.exports = fp(async (fastify, opts) => {
    fastify.decorate('users', {
        get: async () => {
            const client = await fastify.pg.connect()
            const { rows } = await client.query('SELECT id, "name", "pass", email FROM users WHERE deleted_at IS NULL')
            client.release()
            return rows
        },
        getById: async id => {
            const client = await fastify.pg.connect()
            const { rows } = await client.query(
                'SELECT id, "name", "pass", email FROM users WHERE id=$1 AND deleted_at IS NULL',
                [id]
            )
            client.release()
            return rows
        },
        isNameExist: async name => {
            const client = await fastify.pg.connect()
            const { rows } = await client.query(
                'SELECT COUNT(1) FROM users WHERE "name"=$1 AND deleted_at IS NULL',
                [name]
            )
            client.release()
            return rows
        },
        isEmailExist: async email => {
            const client = await fastify.pg.connect()
            const { rows } = await client.query(
                'SELECT COUNT(1) FROM users WHERE email=$1 AND deleted_at IS NULL',
                [email]
            )
            client.release()
            return rows
        },
        addUser: async ({ login, email, password } ) => {
            const
                salt = crypto.randomBytes(8).toString('hex'),
                hash = crypto.pbkdf2Sync(password, salt,
                    500, 32, `sha512`).toString(`hex`)
            try {
                const client = await fastify.pg.connect()
                const { rows } = await client.query(
                    'INSERT INTO users ( id, "name", email, "pass", salt ) VALUES ($1, $2, $3, $4, $5 ) RETURNING id, "name"',
                    [uuidv4(), login, email, hash, salt]
                )
                client.release()
                return rows
            } catch (err) {
                return {error: err}
            }

        },
        loginUser: async ({ email, password }) => {
            try {
                const client = await fastify.pg.connect(),
                { rows } = await client.query(
                        'SELECT id, "name", salt, "pass" FROM users WHERE email=$1 AND deleted_at IS NULL',
                        [email]
                    )
                if (!rows.length)
                    throw 'Пользователь не зарегистрирован'
                const
                    { id, name, salt, pass } = rows[0],
                    hash = crypto.pbkdf2Sync(password, salt,
                        500, 32, `sha512`).toString(`hex`)
                if (hash!==pass)
                    throw 'Пароль введён не верно'

                client.release()
                return {id, name}
            } catch (err) {
                return {error : err}
            }
        }
    })
})
