'use strict'
const PoiController = require('../controller/poi.controller')
const PoiRepository = require('../repository/poi.repository')
const PoiService = require('../service/poi.service')

module.exports = async function (fastify){
    const poiRepository = new PoiRepository(fastify.firebase.db)
    const poiService = new PoiService(poiRepository)
    const poiController = new PoiController(poiService)

    fastify.post('/', poiController.create)
    fastify.get('/', poiController.findAll)
    fastify.get('/type/:type', poiController.findAllTypes)
    fastify.get('/:id', poiController.findById)
    fastify.put('/:id', poiController.update)
    fastify.delete('/:id', poiController.delete)
}