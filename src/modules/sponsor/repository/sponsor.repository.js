const createError = require('http-errors')

class SponsorRepository{
    constructor(db){
        this.collection = db.collection('sponsors')
    }

    async create(sponsor){
        const data = {
            name:sponsor.name,
            description:sponsor.description,
            logo_url:sponsor.logo_url,
            created_at:new Date().toISOString(),
            updated_at:null,
            active:true
        }
        const savedSponsor = await this.collection.add(data)
        return{
            ...data,
            id:savedSponsor.id
        }

    }
    async findAll(){
        const snapshot = await this.collection.where('active','==',true).get()
        return snapshot.docs.map(doc => ({
            ...doc.data(),
            id:doc.id
        }))
    }

    async findById(id){
        const document = await this.collection.doc(id).get()

        if(!document.exists){
            throw new createError.NotFound('Sponsor not found')
        }

        const data = document.data()

        if(!data.active){
            throw new createError.Forbidden('Sponsor not active')
        }
        return{
            ...data,
            id:document.id
        }
    }
    async update(id,sponsor){
         await this.findById(id)

        const dataUpdate = {
            ...sponsor,
            updated_at:new Date().toISOString()
        }

        await this.collection.doc(id).update(dataUpdate)
        return{
            ...dataUpdate,
            name:dataUpdate.name,
            id
        }
    }

    async delete(id){
        await this.findById(id)

        const data = await this.collection.doc(id).update({active:false})
        return{
            id,
            name:data.name,
            active:false
        }
    }
}

module.exports = SponsorRepository
