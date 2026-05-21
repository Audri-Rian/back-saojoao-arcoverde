function CategoryResponseDto(category){
    return{
        id:category.id,
        name:category.name,
        created_at:category.created_at,
    }
}

module.exports = CategoryResponseDto