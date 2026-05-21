'use strict'

const EventController = require('../controller/event.controller')
const EventRepository = require('../repository/event.repository')
const EventService = require('../service/event.service')
const ArtistRepository = require('../../artists/repository/artist.repository')
const SponsorRepository = require('../../sponsor/repository/sponsor.repository')

module.exports = async function(fastify){
    const sponsorRepository = new SponsorRepository(fastify.firebase.db)
    const repository = new EventRepository(fastify.firebase.db)
    const artistsRepository = new ArtistRepository(fastify.firebase.db)
    const service = new EventService(repository,artistsRepository,sponsorRepository)
    const controller = new EventController(service)

    fastify.post('/',controller.create)
    fastify.get('/',controller.findAll)
    fastify.get('/:id',controller.findById)
    fastify.put('/:id',controller.update)
    fastify.delete('/:id',controller.delete)
}