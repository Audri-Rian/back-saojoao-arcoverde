const ArtistRequestDto = require('../dtos/artist.request.dto')
const ArtistResponseDto = require('../dtos/artist.response.dto')
const Artist = require('../domain/artist')
class ArtistService{
    constructor(repository) {
        this.repository = repository
    }
    async create (data){
        const dto = ArtistRequestDto.parse(data)

        const artist = new Artist({
            name:dto.name,
            type:dto.type,
            bio:dto.bio,
            image_url:dto.image_url,
            socialLinks:dto.socialLinks,
            created_at:new Date().toISOString(),
            updated_at:null,
            active:true
        })

        const savedArtist = await this.repository.create(artist)
        return ArtistResponseDto(savedArtist)
    }

    async findAll(){
        const artists = await this.repository.findAll()
        return artists.map(ArtistResponseDto)
    }

    async findById(id){
        const artist = await this.repository.findById(id)
        return ArtistResponseDto(artist)
    }

    async update(id,data){
        await this.findById(id)
        const dto = ArtistRequestDto.parse(data)
        await this.repository.update(id,dto)
        return ArtistResponseDto(await this.repository.findById(id))
    }

    async delete(id){
        await this.findById(id)
        const artist = await this.repository.delete(id)
        return ArtistResponseDto(artist)
    }

}

module.exports = ArtistService
