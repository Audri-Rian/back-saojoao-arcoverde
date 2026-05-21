'use strict'
const SponsorController = require('../controller/sponsor.controller')
const SponsorRepository = require('../repository/sponsor.repository')
const SponsorService = require('../service/sponsor.service')

module.exports = async function(fastfy){
    const sponsorRepository = new SponsorRepository(fastfy.firebase.db)
    const sponsorService = new SponsorService(sponsorRepository)
    const sponsorController = new SponsorController(sponsorService)

    fastfy.post('/', sponsorController.create)
    fastfy.get('/', sponsorController.findAll)
    fastfy.get('/:id', sponsorController.findById)
    fastfy.put('/:id', sponsorController.update)
    fastfy.delete('/:id', sponsorController.delete)


}