const z = require('zod')

const CategoryRequestDto = z.object({
    name:z.string({
        required_error:'Name is required',
        invalid_type_error:'Name is invalid'
    }).trim().min(1,'name not be empty')
})

module.exports = CategoryRequestDto