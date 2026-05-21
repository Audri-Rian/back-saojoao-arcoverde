function SponsorResponseDto(sponsor){
    return{
        name:sponsor.name,
        description:sponsor.description,
        logo_url:sponsor.logo_url,
        created_at:sponsor.created_at,
        updated_at:sponsor.updated_at,
        active:sponsor.active
    }
}

module.exports = SponsorResponseDto
