'use strict'
const PoiController = require('../controller/poi.controller')
const PoiRepository = require('../repository/poi.repository')
const PoiService = require('../service/poi.service')

module.exports = async function (fastify){
    const poiRepository = new PoiRepository(fastify.firebase.db)
    const poiService = new PoiService(poiRepository)
    const poiController = new PoiController(poiService)

    const poiSchema = {
        type: 'object',
        properties: {
            id: { type: 'string', description: 'ID único do ponto de interesse', example: 'poi_123' },
            name: { type: 'string', description: 'Nome do local', example: 'Igreja Matriz' },
            type: { type: 'string', description: 'Tipo do local (ex: restaurante, hospital, monumento)', example: 'monumento' },
            location: { type: 'string', description: 'Localização ou endereço', example: 'Praça Central' },
            image_url: { type: 'string', description: 'URL da imagem do local', example: 'https://exemplo.com/igreja.jpg' }
        },
        required: ['name', 'type', 'location']
    }

    fastify.post('/', {
        schema: {
            tags: ['POIs'],
            summary: 'Create a new Point of Interest (POI)',
            body: {
                type: 'object',
                required: ['name', 'type', 'location'],
                properties: {
                    name: { type: 'string', description: 'Nome do local' },
                    type: { type: 'string', description: 'Tipo do local' },
                    location: { type: 'string', description: 'Localização ou endereço' },
                    image_url: { type: 'string', description: 'URL da imagem' }
                }
            },
            response: {
                201: {
                    description: 'Successful creation of a POI',
                    ...poiSchema
                },
                400: {
                    type: 'object',
                    properties: {
                        message: { type: 'string', example: 'Invalid input' }
                    }
                }
            }
        },
        handler: poiController.create
    })

    fastify.get('/', {
        schema: {
            tags: ['POIs'],
            summary: 'Get all Points of Interest (POIs)',
            response: {
                200: {
                    type: 'array',
                    items: poiSchema
                }
            }
        },
        handler: poiController.findAll
    })

    fastify.get('/type/:type', {
        schema: {
            tags: ['POIs'],
            summary: 'Get POIs by type',
            params: {
                type: 'object',
                properties: {
                    type: { type: 'string', description: 'Type of POI to filter by' }
                },
                required: ['type']
            },
            response: {
                200: {
                    type: 'array',
                    items: poiSchema
                }
            }
        },
        handler: poiController.findAllTypes
    })

    fastify.get('/:id', {
        schema: {
            tags: ['POIs'],
            summary: 'Get a POI by ID',
            params: {
                type: 'object',
                properties: {
                    id: { type: 'string', description: 'POI ID' }
                },
                required: ['id']
            },
            response: {
                200: {
                    description: 'Successful response with a POI',
                    ...poiSchema
                },
                404: {
                    type: 'object',
                    properties: {
                        message: { type: 'string', example: 'POI not found' }
                    }
                }
            }
        },
        handler: poiController.findById
    })

    fastify.put('/:id', {
        schema: {
            tags: ['POIs'],
            summary: 'Update a POI by ID',
            params: {
                type: 'object',
                properties: {
                    id: { type: 'string', description: 'POI ID' }
                },
                required: ['id']
            },
            body: {
                type: 'object',
                properties: {
                    name: { type: 'string', description: 'Nome do local' },
                    type: { type: 'string', description: 'Tipo do local' },
                    location: { type: 'string', description: 'Localização ou endereço' },
                    image_url: { type: 'string', description: 'URL da imagem' }
                }
            },
            response: {
                200: {
                    description: 'Successful update of a POI',
                    ...poiSchema
                },
                400: {
                    type: 'object',
                    properties: {
                        message: { type: 'string', example: 'Invalid input' }
                    }
                },
                404: {
                    type: 'object',
                    properties: {
                        message: { type: 'string', example: 'POI not found' }
                    }
                }
            }
        },
        handler: poiController.update
    })

    fastify.delete('/:id', {
        schema: {
            tags: ['POIs'],
            summary: 'Delete a POI by ID',
            params: {
                type: 'object',
                properties: {
                    id: { type: 'string', description: 'POI ID' }
                },
                required: ['id']
            },
            response: {
                204: {
                    description: 'POI successfully deleted'
                },
                404: {
                    type: 'object',
                    properties: {
                        message: { type: 'string', example: 'POI not found' }
                    }
                }
            }
        },
        handler: poiController.delete
    })
}