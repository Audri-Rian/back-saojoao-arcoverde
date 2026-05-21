class ArtistController{
    constructor(service) {
        this.service = service
    }


   create =  async (req,reply) => {
        const data = req.body
        const artist = await this.service.create(data)
        return reply.status(201).send(artist)
    }

    findAll =  async (req,reply) => {
        const artists = await this.service.findAll()
        return reply.status(200).send(artists)
    }

    findById =  async (req,reply) => {
        const id = req.params.id
        const artist = await this.service.findById(id)
        return reply.status(200).send(artist)
    }

    update = async (req,reply) =>{
        const id = req.params.id
        const data = req.body
        const artist = await this.service.update(id,data)
        return reply.status(200).send(artist)
    }

    delete = async (req,reply) =>{
        const id = req.params.id
        await this.service.delete(id)
        return reply.status(200).send({message:'Artist deleted'})
    }

}
module.exports = ArtistController