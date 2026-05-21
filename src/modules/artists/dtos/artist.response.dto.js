function ArtistResponseDto(artist){
    return{
        id:artist.id,
        name:artist.name,
        type:artist.type,
        bio:artist.bio,
        image_url:artist.image_url,
        created_at:artist.created_at,
        updated_at:artist.updated_at,
        socialLinks:artist.socialLinks
    }
}

module.exports = ArtistResponseDto
