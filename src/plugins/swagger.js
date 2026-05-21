'use strict'

const fp = require('fastify-plugin')

module.exports = fp(async function (fastify) {

    await fastify.register(
        require('@fastify/swagger'),
        {
            openapi: {
                info: {
                    title: 'São João de Arcoverde API',
                    description: 'Documentação oficial da API do São João de Arcoverde. Este sistema gerencia eventos, artistas, pontos de interesse, patrocinadores e categorias.',
                    version: '1.0.0',
                    contact: {
                        name: 'Suporte API',
                        email: 'suporte@arcoverde.pe.gov.br'
                    }
                },
                tags: [
                    { name: 'Events', description: 'Gerenciamento de eventos e programações' },
                    { name: 'Artists', description: 'Gerenciamento de artistas e atrações' },
                    { name: 'Categories', description: 'Categorias de eventos e locais' },
                    { name: 'POIs', description: 'Pontos de interesse e localizações (Turismo)' },
                    { name: 'Sponsors', description: 'Patrocinadores e parceiros do evento' }
                ],
                components: {
                    securitySchemes: {
                        apiKey: {
                            type: 'apiKey',
                            name: 'apiKey',
                            in: 'header'
                        }
                    }
                }
            }
        }
    )

    await fastify.register(
        require('@fastify/swagger-ui'),
        {
            routePrefix: '/docs',
            uiConfig: {
                docExpansion: 'list',
                deepLinking: true
            },
            theme: {
                css: [
                    {
                        content: `
                            .swagger-ui .topbar { background-color: #1b1b1b; border-bottom: 2px solid #e67e22; }
                            .swagger-ui .info .title { color: #2c3e50; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; }
                            .swagger-ui .scheme-container { background: #f8f9fa; border-top: 1px solid #ddd; }
                            .swagger-ui .opblock.opblock-get { background: rgba(97, 175, 254, 0.1); border-color: #61affe; }
                            .swagger-ui .opblock.opblock-post { background: rgba(73, 204, 144, 0.1); border-color: #49cc90; }
                            .swagger-ui .opblock.opblock-put { background: rgba(252, 161, 48, 0.1); border-color: #fca130; }
                            .swagger-ui .opblock.opblock-delete { background: rgba(249, 62, 62, 0.1); border-color: #f93e3e; }
                            .swagger-ui .btn.authorize { color: #e67e22; border-color: #e67e22; }
                            .swagger-ui .btn.authorize svg { fill: #e67e22; }
                        `
                    }
                ]
            },
            staticCSP: true,
            transformStaticCSP: (header) => header
        }
    )
})