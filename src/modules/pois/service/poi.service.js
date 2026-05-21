const PoiRequestDto = require('../dtos/poi.request.dto')
const PoiResponseDto = require('../dtos/poi.response.dto')
const Poi = require('../domain/poi')

class PoiService{
    constructor(poiRepository){
        this.poiRepository = poiRepository
    }

    async create(data){
        const dto = PoiRequestDto.parse(data)

       const poi = new Poi({
         name:dto.name,
           type:dto.type,
           location:dto.location,
           image_url:dto.image_url,
           created_at:new Date().toISOString(),
           update_at:null,
           active:true
       })
        const savedPoi = await this.poiRepository.create(poi)
        return PoiResponseDto(savedPoi)
    }

    async findAll(){
        const pois = await this.poiRepository.findAll()
        return pois.map(PoiResponseDto)
    }

    async findAllTypes(type){
        const pois = await this.poiRepository.findAllTypes(type)
        return pois.map(PoiResponseDto)
    }

    async findById(id){
        const poi = await this.poiRepository.findById(id)
        return PoiResponseDto(poi)
    }

    async update(id,poi){
        const dto = PoiRequestDto.parse(poi)
        const updatedPoi = await this.poiRepository.update(id,dto)
        return PoiResponseDto(updatedPoi)
    }

    async delete(id){
        const poi = await this.poiRepository.delete(id)
        return PoiResponseDto(poi)
    }
}
module.exports = PoiService