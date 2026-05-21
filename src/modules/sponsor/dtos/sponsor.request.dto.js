const z = require('zod')

const SponsorRequestDto = z.object({
    name: z.string({required_error: 'Name is required'}).min(1).max(100),
    description: z.string({required_error: 'Description is required'}).min(1).max(255),
    logo_url: z.string().optional().nullable().default(null)
})

module.exports = SponsorRequestDto