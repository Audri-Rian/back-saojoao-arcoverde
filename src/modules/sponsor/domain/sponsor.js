class Sponsor{
    constructor({id,name,description,logo_url,created_at,updated_at,active}) {

            this.id = id,
            this.name = name,
            this.description = description
            this.logo_url = logo_url
            this.created_at = created_at
            this.updated_at = updated_at
            this.active = active
    }
}

module.exports = Sponsor
