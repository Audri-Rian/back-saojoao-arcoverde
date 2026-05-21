class Artist{
    constructor({id,name,bio,type,image_url,created_at,updated_at,socialLinks,}) {
        this.id = id
        this.name = name
        this.bio = bio
        this.type = type
        this.image_url = image_url
        this.created_at = created_at
        this.updated_at = updated_at
        this.socialLinks = socialLinks
    }
}
module.exports = Artist
