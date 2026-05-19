'use strict'

const fp = require('fastify-plugin')
const admin = require('firebase-admin')

const serviceAccount = require('../../firebase-service-account.json')

async function firebasePlugin(fastify, options) {

    if (!admin.apps.length) {

        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount)
        })

    }

    const db = admin.firestore()

    fastify.decorate('firebase', {
        admin,
        db
    })

    fastify.log.info('Firebase conectado')

}

module.exports = fp(firebasePlugin)