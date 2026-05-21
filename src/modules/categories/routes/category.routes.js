'use strict'
const CategoryRepository = require('../repository/category.repository')
const CategoryController = require('../controller/category.controller')
const CategoryService = require('../service/category.service')

module.exports = async function(fastify){
    const repository = new CategoryRepository(fastify.firebase.db)
    const service = new CategoryService(repository)
    const controller = new CategoryController(service)

    const categorySchema = {
        type: 'object',
        properties: {
            id: { type: 'string', description: 'ID único da categoria', example: 'cat_123' },
            name: { type: 'string', description: 'Nome da categoria', example: 'Gastronomia' }
        },
        required: ['name']
    }

    fastify.post('/', {
        schema: {
            tags: ['Categories'],
            summary: 'Criar uma nova categoria',
            description: 'Cria uma nova categoria para classificar eventos ou locais.',
            body: {
                type: 'object',
                required: ['name'],
                properties: {
                    name: { type: 'string', description: 'Nome da categoria' }
                }
            },
            response: {
                201: {
                    description: 'Categoria criada com sucesso',
                    ...categorySchema
                },
                400: {
                    type: 'object',
                    properties: {
                        message: { type: 'string', example: 'Dados inválidos' }
                    }
                }
            }
        },
        handler: controller.create
    })

    fastify.get('/', {
        schema: {
            tags: ['Categories'],
            summary: 'Listar todas as categorias',
            description: 'Retorna uma lista de todas as categorias cadastradas.',
            response: {
                200: {
                    description: 'Lista de categorias',
                    type: 'array',
                    items: categorySchema
                }
            }
        },
        handler: controller.findAll
    })

    fastify.get('/:id', {
        schema: {
            tags: ['Categories'],
            summary: 'Buscar categoria por ID',
            description: 'Retorna os detalhes de uma categoria específica através do seu ID.',
            params: {
                type: 'object',
                properties: {
                    id: { type: 'string', description: 'ID da categoria' }
                },
                required: ['id']
            },
            response: {
                200: {
                    description: 'Categoria encontrada',
                    ...categorySchema
                },
                404: {
                    type: 'object',
                    properties: {
                        message: { type: 'string', example: 'Categoria não encontrada' }
                    }
                }
            }
        },
        handler: controller.findById
    })

    fastify.delete('/:id', {
        schema: {
            tags: ['Categories'],
            summary: 'Excluir categoria por ID',
            description: 'Remove uma categoria permanentemente do sistema.',
            params: {
                type: 'object',
                properties: {
                    id: { type: 'string', description: 'ID da categoria' }
                },
                required: ['id']
            },
            response: {
                204: {
                    description: 'Categoria excluída com sucesso'
                },
                404: {
                    type: 'object',
                    properties: {
                        message: { type: 'string', example: 'Categoria não encontrada' }
                    }
                }
            }
        },
        handler: controller.delete
    })
}