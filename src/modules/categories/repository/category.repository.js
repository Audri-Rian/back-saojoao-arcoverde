const createError = require('http-errors')
class CategoryRepository{
    constructor(db) {
        this.collection = db.collection('categories')
    }
    async create(category){

        const data = {
            name: category.name,
            active: true,
            created_at: new Date().toISOString()
        }

        const docRef =  await this.collection.add(data)
        return{
            ...category,
            id: docRef.id,
            active: true
        }
        console.log('DOC REF ID:', docRef.id)
    }
    async findAll(){
        const snapshot = await this.collection.where('active', '==', true).get()
        return snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }))
    }
    async findById(id){
        const document = await this.collection.doc(id).get()

        if(!document.exists){
            throw new createError.NotFound('Category not found')
        }
        const data = document.data()

        if(!data.active){
            throw new createError.Forbidden('Category not active')
        }
        return{
            id:document.id,
            ...data
        }
    }
    async findByName(name){
        const snapshot = await this.collection.where('name', '==', name).limit(1).get()
        if(snapshot.empty){
            return null
        }
        const doc = snapshot.docs[0]
        return{
            ...doc.data(),
            id: doc.id
        }
    }
    async delete(id){
       const category = await this.findById(id)
        await this.collection.doc(id).update({
            active: false
        })
        return{
            id:category.id,
            active: false
        }

    }
}
module.exports = CategoryRepository