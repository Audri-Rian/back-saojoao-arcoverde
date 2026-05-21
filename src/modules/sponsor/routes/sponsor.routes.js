'use strict'
const SponsorController = require('../controller/sponsor.controller')
const SponsorRepository = require('../repository/sponsor.repository')
const SponsorService = require('../service/sponsor.service')

module.exports = async function(fastify){
    const sponsorRepository = new SponsorRepository(fastify.firebase.db)
    const sponsorService = new SponsorService(sponsorRepository)
    const sponsorController = new SponsorController(sponsorService)

    const sponsorSchema = {
        type: 'object',
        properties: {
            id: { type: 'string', description: 'ID único do patrocinador', example: 'spon_123' },
            name: { type: 'string', description: 'Nome do patrocinador', example: 'Banco do Brasil' },
            description: { type: 'string', description: 'Descrição ou biografia curta', example: 'Maior banco estatal' },
            logo_url: { type: 'string', description: 'URL da logo do patrocinador', example: 'https://example.com/logo.png' }
        },
        required: ['name']
    }

    fastify.post('/', {
        schema: {
            tags: ['Sponsors'],
            summary: 'Criar um novo patrocinador',
            description: 'Registra um novo patrocinador no sistema.',
            body: {
                type: 'object',
                required: ['name'],
                properties: {
                    name: { type: 'string', description: 'Nome do patrocinador' },
                    logoUrl: { type: 'string', description: 'URL da logo' },
                    website: { type: 'string', description: 'Link do website' }
                }
            },
            response: {
                201: {
                    description: 'Patrocinador criado com sucesso',
                    ...sponsorSchema
                },
                400: {
                    type: 'object',
                    properties: {
                        message: { type: 'string', example: 'Dados inválidos' }
                    }
                }
            }
        },
        handler: sponsorController.create
    })

    fastify.get('/', {
        schema: {
            tags: ['Sponsors'],
            summary: 'Listar todos os patrocinadores',
            description: 'Retorna uma lista de todos os patrocinadores cadastrados.',
            response: {
                200: {
                    description: 'Lista de patrocinadores',
                    type: 'array',
                    items: sponsorSchema
                }
            }
        },
        handler: sponsorController.findAll
    })

    fastify.get('/:id', {
        schema: {
            tags: ['Sponsors'],
            summary: 'Buscar patrocinador por ID',
            description: 'Retorna os detalhes de um patrocinador específico.',
            params: {
                type: 'object',
                properties: {
                    id: { type: 'string', description: 'ID do patrocinador' }
                },
                required: ['id']
            },
            response: {
                200: {
                    description: 'Patrocinador encontrado',
                    ...sponsorSchema
                },
                404: {
                    type: 'object',
                    properties: {
                        message: { type: 'string', example: 'Patrocinador não encontrado' }
                    }
                }
            }
        },
        handler: sponsorController.findById
    })

    fastify.put('/:id', {
        schema: {
            tags: ['Sponsors'],
            summary: 'Atualizar patrocinador por ID',
            description: 'Atualiza as informações de um patrocinador existente.',
            params: {
                type: 'object',
                properties: {
                    id: { type: 'string', description: 'ID do patrocinador' }
                },
                required: ['id']
            },
            body: {
                type: 'object',
                properties: {
                    name: { type: 'string', description: 'Nome do patrocinador' },
                    logoUrl: { type: 'string', description: 'URL da logo' },
                    website: { type: 'string', description: 'Link do website' }
                }
            },
            response: {
                200: {
                    description: 'Patrocinador atualizado com sucesso',
                    ...sponsorSchema
                },
                400: {
                    type: 'object',
                    properties: {
                        message: { type: 'string', example: 'Dados inválidos' }
                    }
                },
                404: {
                    type: 'object',
                    properties: {
                        message: { type: 'string', example: 'Patrocinador não encontrado' }
                    }
                }
            }
        },
        handler: sponsorController.update
    })

    fastify.delete('/:id', {
        schema: {
            tags: ['Sponsors'],
            summary: 'Excluir patrocinador por ID',
            description: 'Remove um patrocinador permanentemente do sistema.',
            params: {
                type: 'object',
                properties: {
                    id: { type: 'string', description: 'ID do patrocinador' }
                },
                required: ['id']
            },
            response: {
                204: {
                    description: 'Patrocinador excluído com sucesso'
                },
                404: {
                    type: 'object',
                    properties: {
                        message: { type: 'string', example: 'Patrocinador não encontrado' }
                    }
                }
            }
        },
        handler: sponsorController.delete
    })
}