import { once } from 'node:events'
import Hero from '../entitites/hero.js'
import { DEFAULT_HANDLER } from '../util/util.js'

const routes = ({ heroService }) => ({
    '/heroes:get': async (request, response) => {
        const heroes = await heroService.find()

        response.writeHead(200, DEFAULT_HANDLER)
        response.write(JSON.stringify({ results: heroes }))
        return response.end()
    },

    '/heroes:post': async (request, response) => {
        const data = await once(request, 'data')
        const item = JSON.parse(data)
        const hero = new Hero(item)

        const id = await heroService.create(hero)

        response.writeHead(201, DEFAULT_HANDLER)
        response.write(JSON.stringify({
            success: 'User created with success!',
            id
        }))
        return response.end()
    },

    '/heroes:patch': async (request, response) => {
        const data = await once(request, 'data')
        const item = JSON.parse(data)

        const id = await heroService.alter(item)

        response.writeHead(202, DEFAULT_HANDLER)
        response.write(JSON.stringify({
            success: "Hero altered with success!",
            id
        }))
        return response.end()
    },

    '/heroes:delete': async (request, response) => {
        const data = await once(request, 'data')
        const item = JSON.parse(data)

        const result = await heroService.delete(item)

        response.writeHead(202, DEFAULT_HANDLER)
        response.write(JSON.stringify({
            success: result.message
        }))
        return response.end()
    }
})

export { routes }