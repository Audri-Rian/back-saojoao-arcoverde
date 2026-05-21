const z = require('zod')

const PoiRequestDto = z.object({
    name:z.string().min(1,'name not be empty'),
    type:z.string().min(1,'type not be empty'),
    location:z.string().min(1,'location not be empty'),
    image_url:z.string().optional().nullable().default(null)

})

module.exports = PoiRequestDto
