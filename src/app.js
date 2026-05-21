'use strict'

const path = require('node:path')
const AutoLoad = require('@fastify/autoload')

// Pass --options via CLI arguments in command to enable these options.
const options = {}

module.exports = async function (fastify, opts) {
  // Place here your custom code!



  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'plugins'),
    options: Object.assign({}, opts)
  })
  fastify.register(
      require('./plugins/error-handler')
  )
  fastify.register(
      require('./modules/categories/routes/category.routes'),
      {
        prefix: '/categories'
      }
  )
    fastify.register(
        require('./modules/events/routes/event.routes'),
        {
            prefix: '/events'
        }
    )
    fastify.register(
        require('./modules/artists/routes/artist.routes'),
        {
            prefix: '/artists'
        }
    )

    fastify.register(
        require('./modules/pois/routes/poi.routes'),
        {
            prefix: '/pois'
        }
    )
    fastify.register(
        require('./modules/sponsor/routes/sponsor.routes'),
        {
            prefix: '/sponsors'
        }
    )

}

module.exports.options = options
