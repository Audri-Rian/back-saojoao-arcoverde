'use strict'

const Fastify = require('fastify')
const app = require('./src/app')

const fastify = Fastify({
    logger: true
})

fastify.register(
    require('./src/app')
)

const start = async () => {
    try {

        await fastify.listen({
            port: 3000,
            host: '0.0.0.0'
        })

    } catch (err) {

        fastify.log.error(err)
        process.exit(1)

    }
}

start()