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

    const eventSchema = {
        type: 'object',
        properties: {
            id: { type: 'string', description: 'ID único do evento', example: 'evt_123' },
            title: { type: 'string', description: 'Nome do evento', example: 'Abertura do São João' },
            subtitle: { type: 'string', description: 'Subtítulo ou tema', example: 'Uma noite inesquecível' },
            description: { type: 'string', description: 'Descrição detalhada do evento', example: 'Grande show de abertura na Praça da Bandeira.' },
            date: { type: 'string', format: 'date', description: 'Data do evento (YYYY-MM-DD)', example: '2024-06-21' },
            location: { type: 'string', description: 'Local onde ocorrerá o evento', example: 'Praça da Bandeira' },
            category_id: { type: 'string', description: 'ID da categoria do evento', example: 'cat_abc' },
            image_url: { type: 'string', description: 'URL da imagem de capa', example: 'https://ex.com/cover.jpg' },
            artists: {
                type: 'array',
                items: { type: 'string' },
                description: 'Lista de IDs dos artistas participantes',
                example: ['art_1', 'art_2']
            },
            sponsors: {
                type: 'array',
                items: { type: 'string' },
                description: 'Lista de IDs dos patrocinadores do evento',
                example: ['spon_1']
            }
        },
        required: ['title', 'description', 'date', 'location', 'category_id']
    }

    fastify.post('/', {
        schema: {
            tags: ['Events'],
            summary: 'Create a new event',
            body: {
                type: 'object',
                required: ['title', 'description', 'date', 'location', 'category_id'],
                properties: {
                    title: { type: 'string', description: 'Título do evento' },
                    subtitle: { type: 'string', description: 'Subtítulo do evento' },
                    description: { type: 'string', description: 'Descrição do evento' },
                    date: { type: 'string', format: 'date', description: 'Data do evento (YYYY-MM-DD)' },
                    location: { type: 'string', description: 'Localização do evento' },
                    category_id: { type: 'string', description: 'ID da categoria do evento' },
                    image_url: { type: 'string', description: 'URL da imagem do evento' },
                    artists: {
                        type: 'array',
                        items: { type: 'string' },
                        description: 'Array of artist IDs participating in the event'
                    },
                    sponsors: {
                        type: 'array',
                        items: { type: 'string' },
                        description: 'Array of sponsor IDs for the event'
                    }
                }
            },
            response: {
                201: {
                    description: 'Successful creation of an event',
                    ...eventSchema
                },
                400: {
                    type: 'object',
                    properties: {
                        message: { type: 'string', example: 'Invalid input' }
                    }
                }
            }
        },
        handler: controller.create
    })

    fastify.get('/', {
        schema: {
            tags: ['Events'],
            summary: 'Get all events',
            response: {
                200: {
                    type: 'array',
                    items: eventSchema
                }
            }
        },
        handler: controller.findAll
    })

    fastify.get('/:id', {
        schema: {
            tags: ['Events'],
            summary: 'Get an event by ID',
            params: {
                type: 'object',
                properties: {
                    id: { type: 'string', description: 'Event ID' }
                },
                required: ['id']
            },
            response: {
                200: {
                    description: 'Successful response with an event',
                    ...eventSchema
                },
                404: {
                    type: 'object',
                    properties: {
                        message: { type: 'string', example: 'Event not found' }
                    }
                }
            }
        },
        handler: controller.findById
    })

    fastify.put('/:id', {
        schema: {
            tags: ['Events'],
            summary: 'Update an event by ID',
            params: {
                type: 'object',
                properties: {
                    id: { type: 'string', description: 'Event ID' }
                },
                required: ['id']
            },
            body: {
                type: 'object',
                properties: {
                    title: { type: 'string', description: 'Título do evento' },
                    subtitle: { type: 'string', description: 'Subtítulo do evento' },
                    description: { type: 'string', description: 'Descrição do evento' },
                    date: { type: 'string', format: 'date', description: 'Data do evento (YYYY-MM-DD)' },
                    location: { type: 'string', description: 'Localização do evento' },
                    category_id: { type: 'string', description: 'ID da categoria do evento' },
                    image_url: { type: 'string', description: 'URL da imagem do evento' },
                    artists: {
                        type: 'array',
                        items: { type: 'string' },
                        description: 'Array of artist IDs participating in the event'
                    },
                    sponsors: {
                        type: 'array',
                        items: { type: 'string' },
                        description: 'Array of sponsor IDs for the event'
                    }
                }
            },
            response: {
                200: {
                    description: 'Successful update of an event',
                    ...eventSchema
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
                        message: { type: 'string', example: 'Event not found' }
                    }
                }
            }
        },
        handler: controller.update
    })

    fastify.delete('/:id', {
        schema: {
            tags: ['Events'],
            summary: 'Delete an event by ID',
            params: {
                type: 'object',
                properties: {
                    id: { type: 'string', description: 'Event ID' }
                },
                required: ['id']
            },
            response: {
                204: {
                    description: 'Event successfully deleted'
                },
                404: {
                    type: 'object',
                    properties: {
                        message: { type: 'string', example: 'Event not found' }
                    }
                }
            }
        },
        handler: controller.delete
    })
}