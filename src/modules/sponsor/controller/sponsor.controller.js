class SponsorController{
    constructor(sponsorService){
        this.sponsorService = sponsorService
    }

    create = async (req, reply) => {
        const data = req.body
        const sponsor = await this.sponsorService.create(data)
        reply.status(201).send(sponsor)
    }

    findAll = async (req, reply) => {
        const sponsors = await this.sponsorService.findAll()
        reply.status(200).send(sponsors)
    }

    findById = async (req, reply) => {
        const sponsor = await this.sponsorService.findById(req.params.id)
        reply.status(200).send(sponsor)
    }

    update = async (req, reply) => {
        const data = req.body
        const sponsor = await this.sponsorService.update(req.params.id, data)
        reply.status(200).send(sponsor)
    }

    delete = async (req, reply) => {
        const sponsor = await this.sponsorService.delete(req.params.id)
        reply.status(200).send(sponsor)
    }
}

module.exports = SponsorController