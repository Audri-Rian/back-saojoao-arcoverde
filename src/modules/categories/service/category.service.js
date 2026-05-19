const Category = require('../domain/category')
const CategoryRequestDto = require('../dtos/category.request.dto')
const CategoryResponseDto = require('../dtos/category.response.dto')
const createError = require('http-errors')
const apiResponseDto = require('../../../shared/dtos/apiResponse.dto')


class CategoryService{
    constructor(repository) {
        this.repository = repository
    }
    async create (data){
       const dto = CategoryRequestDto.parse(data)
        const category = new Category({
            name: dto.name,
            created_at: new Date().toISOString(),
            updated_at: null,
            active: true
        })
        const existingCategory = await this.repository.findByName(dto.name)
        if(existingCategory){
            throw new createError.Conflict('Category already exists')
        }
        const savedCategory = await this.repository.create(category)
        return CategoryResponseDto(savedCategory)
        console.log(savedCategory)
    }
    async findAll(){
        const categories =  await this.repository.findAll()
        return categories.map(CategoryResponseDto)
    }
    async findById(id){
        const category = await this.repository.findById(id)
        return CategoryResponseDto(category)
    }
    async delete(id){
       await this.repository.delete(id)
        return apiResponseDto('Category deleted')
    }
}
module.exports = CategoryService