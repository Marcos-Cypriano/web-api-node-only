import test from 'node:test'
import assert from 'node:assert'

import { routes } from '../../../src/routes/heroRoute.js'
import { DEFAULT_HANDLER } from '../../../src/util/util.js'


const callTracker = new assert.CallTracker()
process.on('exit', () => callTracker.verify())


test('Hero routes - endpoints test suite', async (t) => {
    await t.test('it should call /heroes:get route', async () => {
        // Isto é mock: objeto necessário para que o teste funcione (neste caso replica o DB)
        const databaseMock = [{
            "id": "3015490a-ed5c-4f6c-b14b-843ea87601f7",
            "name": "Bruce Wayne",
            "age": 50,
            "power": "rich"
        }]

        // Stub: intercepta chamada externa (neste caso altera o funcionamento do service para o teste)
        const heroServiceStub = {
            find: async () => databaseMock
        }

        const endpoints = routes({ heroService: heroServiceStub })

        const endpoint = '/heroes:get'
        // A função once no heroRoute retorna o erro 'The "emitter" argument must be an instance of EventEmitter. Received an instance of Object'
        const request = {}
        const response = {
            write: callTracker.calls(item => {
                const expected = JSON.stringify({
                    results: databaseMock
                })
                assert.strictEqual( item, expected, 'write should be called with the correct payload')
            }),
            end: callTracker.calls(item => {
                assert.strictEqual( item, undefined, 'end should be called without params')
            })
        }
        
        const route = endpoints[endpoint]
        await route(request, response)
    })

    await t.test('it should call /heroes:post route', async () => {

        //SPY: um stub usado para validar como a função foi chamada, quais parâmetros e quantas vezes
        //const spy = callTracker.calls(1)

        const heroServiceStub = {
            create: async (data) => data.id
        }

        const endpoints = routes({ heroService: heroServiceStub })

        const endpoint = '/heroes:post'
        const request = {
            url: '/heroes',
            method: 'POST',
            data: {
                name: 'Flash',
                age: 29,
                power: 'speed'
            }
        }
        
        const response = {
            write: callTracker.calls(item => {
                const expected = JSON.stringify({
                    success: 'User created with success!',
                    id
                })
                assert.strictEqual(item, expected, 'write should be called with the correct payload')
            }),
            end: callTracker.calls(item => {
                assert.strictEqual( item, undefined, 'end should be called without params')
            })
        }

        const route = endpoints[endpoint]
        await route(request, response)
    })
})