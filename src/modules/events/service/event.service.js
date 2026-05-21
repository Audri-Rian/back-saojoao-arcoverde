const EventRequestDto = require('../dtos/event.request.dto')
const EventResponseDto = require('../dtos/event.response.dto')
const Event = require('../domain/event')

class EventService{
    constructor(repository,artistsRepository,sponsorRepository) {
        this.repository = repository
        this.artistsRepository = artistsRepository
        this.sponsorRepository = sponsorRepository
    }


    async create(data){
        const dto = EventRequestDto.parse(data)
        const artits = []
        const sponsors = []
        for(const artistId of dto.artistIds){
           const artist = await this.artistsRepository.findById(artistId)
           artits.push({
               id:artistId,
               name:artist.name
           })
        }

        for(const sponsorsId of dto.sponsorIds){
            const sponsor = await this.sponsorRepository.findById(sponsorsId)
            sponsors.push({
                id:sponsorsId,
                name:sponsor.name
            })
        }
        const category = await this.repository.categoryRepository.findById(dto.category_id)
        const event = new Event({
            title: dto.title,
            description:dto.description,
            subtitle: dto.subtitle,
            date: dto.date,
            artists: artits,
            sponsors: sponsors,
            start_time: dto.start_time,
            end_time: dto.end_time,
            location: dto.location,
            category_id: dto.category_id,
            category_name: category.name,
            image_url: dto.image_url,
        })
        const savedEvent = await this.repository.create(event)
        return EventResponseDto(savedEvent)
    }
    async findAll(){
        const events = await this.repository.findAll()
        return events.map(EventResponseDto)
    }
    async findById(id){
        const event = await this.repository.findById(id)
        return EventResponseDto(event)
    }
    async update(id,data){
       await this.repository.findById(id)
       const dto = EventRequestDto.parse(data)
       const updatedEvent = await this.repository.update(id,dto)
        return EventResponseDto(updatedEvent)

    }
    async delete(id){
        const event = await this.repository.findById(id)
        await this.repository.delete(id)
        return EventResponseDto(event)
    }
}
module.exports = EventService
