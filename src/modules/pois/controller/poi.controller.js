class PoiController{
    constructor(poiService){
        this.poiService = poiService
    }


    create = async (req, reply) => {
        const data = req.body
       const poi = await this.poiService.create(data)
        reply.status(201).send(poi)
    }
    findAll = async (req, reply) => {
        const pois = await this.poiService.findAll()
        reply.status(200).send(pois)
    }
    findAllTypes = async (req, reply) => {
        const pois = await this.poiService.findAllTypes(req.params.type)
        reply.status(200).send(pois)
    }
    findById = async (req, reply) => {
        const poi = await this.poiService.findById(req.params.id)
        reply.status(200).send(poi)
    }
    update = async (req, reply) => {
        const poi = await this.poiService.update(req.params.id, req.body)
        reply.status(200).send(poi)
    }
    delete = async (req, reply) => {
        const poi = await this.poiService.delete(req.params.id)
        reply.status(200).send(poi)
    }

}

module.exports = PoiController