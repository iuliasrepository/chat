'use strict'

module.exports = async function (fastify, opts) {
  fastify.get('/', async function (request, reply) {
    return fastify.users.get()
  })

  fastify.get('/:id', async function (request, reply) {
    return fastify.users.getById(request.params.id)
  })
}
