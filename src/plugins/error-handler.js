'use strict'

module.exports = async function (fastify) {

    fastify.setErrorHandler(
        (error, request, reply) => {

            fastify.log.error(error)

            return reply
                .status(error.statusCode || 500)
                .send({

                    statusCode:
                        error.statusCode || 500,

                    error:
                        error.name ||
                        'Internal Server Error',

                    message:
                        error.message ||
                        'Unexpected error'
                })
        }
    )
}