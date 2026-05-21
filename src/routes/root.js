'use strict'

module.exports = async function (fastify) {
  fastify.get('/health', async function () {
    return {
      status: 'ok',
      framework: 'fastify',
      database: 'firebase'

    }
  })
}
