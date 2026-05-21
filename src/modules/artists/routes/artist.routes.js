'use strict'
const ArtistService = require('../service/artist.service')
const ArtistController = require('../controller/artist.controller')
const ArtistRepository = require('../repository/artist.repository')

module.exports = async function(fastify){
    const artistRepository = new ArtistRepository(fastify.firebase.db)
    const artistService = new ArtistService(artistRepository)
    const artistController = new ArtistController(artistService)

    const artistSchema = {
        type: 'object',
        properties: {
            id: { type: 'string', description: 'ID único do artista', example: 'art_123' },
            name: { type: 'string', description: 'Nome do artista/banda', example: 'Alceu Valença' },
            type: { type: 'string', description: 'Tipo/Gênero musical principal', example: 'Forró / MPB' },
            bio: { type: 'string', description: 'Biografia do artista', example: 'Um dos maiores ícones.' },
            image_url: { type: 'string', description: 'URL da imagem de perfil', example: 'https://ex.com/img.png' },
            socialLinks: { 
                type: 'object', 
                description: 'Redes sociais e contatos', 
                example: { instagram: '@alceu', youtube: 'alceucanal' } 
            }
        },
        required: ['name', 'type', 'bio']
    }

    fastify.post('/', {
        schema: {
            tags: ['Artists'],
            summary: 'Create a new artist',
            body: {
                type: 'object',
                required: ['name', 'type', 'bio'],
                properties: {
                    name: { type: 'string', description: 'Nome do artista' },
                    type: { type: 'string', description: 'Tipo/Gênero musical' },
                    bio: { type: 'string', description: 'Biografia do artista' },
                    image_url: { type: 'string', description: 'URL da imagem de perfil' },
                    socialLinks: { type: 'object', description: 'Links para redes sociais' }
                }
            },
            response: {
                201: {
                    description: 'Successful creation of an artist',
                    ...artistSchema
                },
                400: {
                    type: 'object',
                    properties: {
                        message: { type: 'string', example: 'Invalid input' }
                    }
                }
            }
        },
        handler: artistController.create
    })

    fastify.get('/', {
        schema: {
            tags: ['Artists'],
            summary: 'Get all artists',
            response: {
                200: {
                    type: 'array',
                    items: artistSchema
                }
            }
        },
        handler: artistController.findAll
    })

    fastify.get('/:id', {
        schema: {
            tags: ['Artists'],
            summary: 'Get an artist by ID',
            params: {
                type: 'object',
                properties: {
                    id: { type: 'string', description: 'Artist ID' }
                },
                required: ['id']
            },
            response: {
                200: {
                    description: 'Successful response with an artist',
                    ...artistSchema
                },
                404: {
                    type: 'object',
                    properties: {
                        message: { type: 'string', example: 'Artist not found' }
                    }
                }
            }
        },
        handler: artistController.findById
    })

    fastify.put('/:id', {
        schema: {
            tags: ['Artists'],
            summary: 'Update an artist by ID',
            params: {
                type: 'object',
                properties: {
                    id: { type: 'string', description: 'Artist ID' }
                },
                required: ['id']
            },
            body: {
                type: 'object',
                properties: {
                    name: { type: 'string', description: 'Nome do artista' },
                    type: { type: 'string', description: 'Tipo/Gênero musical' },
                    bio: { type: 'string', description: 'Biografia do artista' },
                    image_url: { type: 'string', description: 'URL da imagem de perfil' },
                    socialLinks: { type: 'object', description: 'Links para redes sociais' }
                }
            },
            response: {
                200: {
                    description: 'Successful update of an artist',
                    ...artistSchema
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
                        message: { type: 'string', example: 'Artist not found' }
                    }
                }
            }
        },
        handler: artistController.update
    })

    fastify.delete('/:id', {
        schema: {
            tags: ['Artists'],
            summary: 'Delete an artist by ID',
            params: {
                type: 'object',
                properties: {
                    id: { type: 'string', description: 'Artist ID' }
                },
                required: ['id']
            },
            response: {
                204: {
                    description: 'Artist successfully deleted'
                },
                404: {
                    type: 'object',
                    properties: {
                        message: { type: 'string', example: 'Artist not found' }
                    }
                }
            }
        },
        handler: artistController.delete
    })
}