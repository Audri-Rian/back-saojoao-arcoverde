const z = require('zod')




const EventRequestDto = z.object({
    title:z.string({required_error:'Title is required',}).trim().min(1,'name not be empty'),
    subtitle:z.string().nullable().default(null),
    description:z.string({required_error:'description is required'}).trim().min(1,'description not be empty'),
    start_time:z.string({requires_error:'start_time is required'}).trim().min(1).transform((val) => new Date(val)),
    end_time:z.string().transform((val) => new Date(val)).optional().nullable().default(null),
    date:z.string().transform((val) => new Date(val)),
    location:z.string().trim().min(1,'location not be empty'),
    category_id:z.string().trim().min(1,'category_id not be empty'),
    artistIds:z.array(z.string().trim().min(1,'artist_id not be empty')).optional().default([]),
    sponsorIds:z.array(z.string().trim().min(1,'sponsor_id not be empty')).optional().default([]),
    image_url:z.string().optional()

})

module.exports = EventRequestDto