'use strict'

module.exports = async function (fastify, opts) {
  fastify.get('/', async function (request, reply) {
    return fastify.users.get()
  })

  fastify.get('/:id', async function (request, reply) {
    return fastify.users.getById(request.params.id)
  })

  fastify.get('/name=:name', async function (request, reply) {
    return fastify.users.isNameExist(request.params.name)
  })

  fastify.get('/email=:email', async function (request, reply) {
    return fastify.users.isEmailExist(request.params.email)
  })

  fastify.get('/:email/:password', async function (request, reply) {
    return fastify.users.loginUser(request.params)
  })

  fastify.post('/', async function (request, reply) {
    return fastify.users.addUser(request.body)
  })
}
