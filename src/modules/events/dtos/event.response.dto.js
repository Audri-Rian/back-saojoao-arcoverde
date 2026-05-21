function EventResponseDto(event){
    return{
        id:event.id,
        title:event.title,
        subtitle:event.subtitle || null,
        description:event.description,
        date: event.date?.toDate
            ? event.date.toDate().toISOString()
            : event.date,
        location:event.location,
        start_time:event.start_time,
        end_time:event.end_time,
        category_id:event.category_id,
        artists:event.artists,
        sponsors:event.sponsors,
        category_name:event.category_name,
        image_url:event.image_url,
        created_at:event.created_at,
        updated_at:event.updated_at,
        active:event.active

    }
}

module.exports = EventResponseDto