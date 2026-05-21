const SponsorRequestDto = require('../dtos/sponsor.request.dto')
const SponsorResponseDto = require('../dtos/sponsor.response.dto')
class SponsorService{
    constructor(sponsorRepository){
        this.sponsorRepository = sponsorRepository
    }

    async create(sponsor){
        const dto = SponsorRequestDto.parse(sponsor)

        const data ={
            name: dto.name,
            description: dto.description,
            logo_url: dto.logo_url,
            created_at: new Date().toISOString(),
            updated_at: null,
            active: true
        }
        const savedSponsor = await this.sponsorRepository.create(data)
        return SponsorResponseDto(savedSponsor)
    }
    async findAll(){
        const sponsors = await this.sponsorRepository.findAll()
        return sponsors.map(sponsor => SponsorResponseDto(sponsor))
    }
    async findById(id){
        const sponsor = await this.sponsorRepository.findById(id)
        return SponsorResponseDto(sponsor)
    }
    async update(id,data){
        await this.findById(id)
        const dto = SponsorRequestDto.parse(data)
        await this.sponsorRepository.update(id, dto)
        return SponsorResponseDto(await this.sponsorRepository.findById(id))

    }
    async delete(id){
        await this.findById(id)
        await this.sponsorRepository.delete(id)
        return SponsorResponseDto(await this.sponsorRepository.findById(id))
    }
}
module.exports = SponsorService