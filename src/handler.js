import { join, dirname } from 'node:path'
import { parse, fileURLToPath } from 'node:url'
import { generateInstance } from './factories/heroFactory.js'
import { routes } from './routes/heroRoute.js'
import { DEFAULT_HANDLER } from './util/util.js'

const currentDir = dirname(
    fileURLToPath(import.meta.url)
)

const filePath = join(currentDir, './../database', 'data.json')

const heroService = generateInstance({ filePath })

const heroRoutes = routes({ heroService })

const allRoutes = {

    // All routes
    ...heroRoutes,

    // 404 routes
    default: (request, response) => {
        response.writeHead(404, DEFAULT_HANDLER)
        response.write('Url not found!')
        response.end()
    }
}

function handler (request, response) {
    const { url, method } = request
    const { pathname } = parse(url, true)

    const key = `${pathname}:${method.toLowerCase()}`
    const chosen = allRoutes[key] || allRoutes.default

    return Promise.resolve(chosen(request, response))
    .catch(handlerError(response))
}

function handlerError (response) {
    return error => {
        console.log('Something bad has happened:', error.stack)
        response.writeHead(500, DEFAULT_HANDLER)
        response.write(JSON.stringify({
            error: 'internet server error!'
        }))

        return response.end()
    }
}

export default handler