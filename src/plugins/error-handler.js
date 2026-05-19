'use strict'

module.exports = async function (fastify,opts){

    fastify.setErrorHandler((error, request, reply) => {

        const statusCode = error.statusCode || 500
        const message = error.message
        return reply.status(statusCode).send({
            error:error.message,
            message
        })
    })
}