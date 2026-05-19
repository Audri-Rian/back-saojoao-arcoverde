

class CategoryController{
    constructor(service) {
        this.service = service
    }

    create = async (req, reply) => {
        const result = await this.service.create(req.body)
        return reply.code(201).send(result)
    }
    findAll = async (req, reply) => {
        const result = await this.service.findAll()
        return reply.code(200).send(result)
    }
    findById = async (req,reply) =>{
        const result = await this.service.findById(req.params.id)
        return reply.code(200).send(result)
    }
    delete = async (req,reply) =>{
        const result = await this.service.delete(req.params.id)
        return reply.code(200).send(result)
    }
}
module.exports = CategoryController