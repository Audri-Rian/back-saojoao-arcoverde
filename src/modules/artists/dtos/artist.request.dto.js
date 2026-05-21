const z = require('zod')


const SocialLinkSchema = z.object({
    platform: z.string(),
    url: z.string()
})


const ArtistRequestDto = z.object({
    name:z.string({required_error:'name is required'}).trim().min(1,'name not empty'),
    type:z.string({required_error:'type is required'}).trim().min(1,'type not empty'),
    bio:z.string().optional(),
    image_url:z.string().optional(),
    socialLinks:z.array(SocialLinkSchema).optional().default([]),
    })
module.exports = ArtistRequestDto

