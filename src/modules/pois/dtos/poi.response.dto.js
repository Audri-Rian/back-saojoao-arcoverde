function PoiResponseDto(poi){

    return{
        id:poi.id,
        name:poi.name,
        type:poi.type,
        location:poi.location,
        image_url:poi.image_url,
        created_at:poi.created_at,
        update_at:poi.update_at
    }

}

module.exports = PoiResponseDto
