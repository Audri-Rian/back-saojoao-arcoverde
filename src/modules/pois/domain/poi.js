class Poi {
    constructor({id,name,type,location,created_at,update_at,image_url}) {
        this.id = id
        this.name = name
        this.type = type
        this.location = location
        this.created_at = created_at
        this.update_at = update_at
        this.image_url = image_url
    }
    
}

module.exports = Poi