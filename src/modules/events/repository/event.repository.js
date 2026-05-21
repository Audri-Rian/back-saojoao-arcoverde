const createError = require('http-errors')
const CategoryRepository = require('../../categories/repository/category.repository')

class EventRepository{
    constructor(db) {
        this.collection = db.collection('events')
        this.categoryRepository = new CategoryRepository(db)
    }
    async create(event){
        const category = await this.categoryRepository.findById(event.category_id)
        const data = {
            title:event.title,
            description:event.description,
            subtitle:event.subtitle,
            date:event.date,
            location:event.location,
            artists:event.artists,
            sponsors:event.sponsors,
            category_id:category.id,
            category_name:category.name,
            image_url:event.image_url,
            created_at:new Date().toISOString(),
            active:true

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
            id:doc.id,
            ...doc.data()
        }))
    }
    async findById(id){
        const document = await this.collection.doc(id).get()

        if(!document.exists){
            throw new createError.NotFound('Event not found')
        }
        const data = document.data()
        if(!data.active){
            throw new createError.Forbidden('Event not active')
        }
        return{
            id:document.id,
            ...data
        }
    }

    async update(id,event){
        await this.findById(id)
        const updateData ={
            ...event,
            updated_at:new Date().toISOString()
        }
        await this.collection.doc(id).update(updateData)
        return{
            ...updateData,
            id
        }
    }

    async delete(id){
        const event = await this.findById(id)
        await this.collection.doc(id).update({
            active:false
        })
        return{
            id,
            title:event.title,
            active:false
        }
    }
}
module.exports = EventRepository