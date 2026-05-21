'use strict'
const ArtistService = require('../service/artist.service')
const ArtistController = require('../controller/artist.controller')
const ArtistRepository = require('../repository/artist.repository')

module.exports = async function(fastify){
    const artistRepository = new ArtistRepository(fastify.firebase.db)
    const artistService = new ArtistService(artistRepository)
    const artistController = new ArtistController(artistService)

    fastify.post('/',artistController.create)
    fastify.get('/',artistController.findAll)
    fastify.get('/:id',artistController.findById)
    fastify.put('/:id',artistController.update)
    fastify.delete('/:id',artistController.delete)
}
