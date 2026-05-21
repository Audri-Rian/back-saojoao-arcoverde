const createError = require('http-errors')

class ArtistRepository{
    constructor(db) {
        this.collection = db.collection('artists')
    }

    async create(artist){
       const data = {
           name:artist.name,
           type:artist.type,
           bio:artist.bio,
           image_url:artist.image_url,
           socialLinks:artist.socialLinks,
           created_at:new Date().toISOString(),
           updated_at:null,
           active:true

       }
       const docRef = await this.collection.add(data)
       return{
           ...data,
           id:docRef.id
       }
    }

    async findAll(){
        const snapshot = await this.collection.where('active','==',true).get()
        return snapshot.docs.map(doc => ({
            ...doc.data(),
            id:doc.id,
        }))
    }

    async findById(id){
        const doc = await this.collection.doc(id).get()

        if(!doc.exists){
            throw createError.NotFound('Artist not found')
        }
        const data = doc.data()

        if(!data.active){
            throw createError.Forbidden('Artist not active')
        }
        return{
            ...data,
            id:doc.id

        }
    }

    async update(id,artist){
        await this.findById(id)
        const updateData = {
            ...artist,
            updated_at:new Date().toISOString()
        }
        await this.collection.doc(id).update(updateData)
        return{
            ...updateData,
            id
        }
    }

    async delete(id){
        const artist = await this.findById(id)
        await this.collection.doc(id).update({active:false})

        return{
            id:artist.id,
            name:artist.name,
            active:false
        }
    }
}

module.exports = ArtistRepository
