'use strict'
const CategoryRepository = require('../repository/category.repository')
const CategoryController = require('../controller/category.controller')
const CategoryService = require('../service/category.service')

module.exports = async function(fastify,opts){
    const repository = new CategoryRepository(fastify.firebase.db)
    const service = new CategoryService(repository)
    const controller = new CategoryController(service)

    fastify.post('/', controller.create)
    fastify.get('/', controller.findAll)
    fastify.get('/:id', controller.findById)
    fastify.delete('/:id', controller.delete)
}