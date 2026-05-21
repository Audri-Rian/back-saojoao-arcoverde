const createError = require('http-errors')
class PoiRepository{
    constructor(db){
        this.collection = db.collection('pois')
    }

    async create(poi){
        const data = {
            name:poi.name,
            type:poi.type,
            location:poi.location,
            image_url:poi.image_url,
            created_at:new Date().toISOString(),
            update_at:new Date().toISOString(),
            active: true
        }
        const docRef = await this.collection.add(data)
        return{
            ...data,
            id:docRef.id
        }
    }

    async findAll(){
        const snapshot = await this.collection.where('active', '==', true).get()
        return snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }))
    }

    async findAllTypes(type){
        const snapshot = await this.collection.where('type', '==', type).get()
        return snapshot.docs.map(doc => ({
            ...doc.data(),
            id: doc.id,
        }))
    }

    async findById(id){
        const document = await this.collection.doc(id).get()

        if(!document.exists){
            throw new createError.NotFound('Poi not found')
        }

        const data = document.data()
        if(!data.active){
            throw new createError.Forbidden('Poi not active')
        }
        return{
            ...data,
            id:document.id
        }
    }

    async update(id,poi){
        await this.findById(id)

        const updateData = {
            ...poi,
            update_at:new Date().toISOString()
        }
        await this.collection.doc(id).update(updateData)
        return{
            ...updateData,
            id
        }
    }

    async delete (id){
        const poi = await this.findById(id)
        await this.collection.doc(id).update({active:false})
        return{
            id:poi.id,
            name:poi.name,
            active:false
        }
    }

}

module.exports = PoiRepository

