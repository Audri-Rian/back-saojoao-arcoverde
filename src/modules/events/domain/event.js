class Event{
    constructor({id,title,description,subtitle,artists,sponsors,date,start_time,end_time,location,category_id,category_name,image_url,created_at,updated_at,active}) {
        this.id = id
        this.title = title
        this.description = description
        this.subtitle = subtitle
        this.date = date
        this.start_time = start_time
        this.end_time = end_time
        this.location = location
        this.artists = artists
        this.sponsors = sponsors
        this.category_id = category_id
        this.category_name = category_name
        this.image_url = image_url
        this.created_at = created_at
        this.updated_at = updated_at
        this.active = active
    }
}
module.exports = Event