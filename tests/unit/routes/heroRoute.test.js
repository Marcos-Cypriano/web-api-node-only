import test from 'node:test'
import assert from 'node:assert'

import { routes } from '../../../src/routes/heroRoute.js'
import { DEFAULT_HANDLER } from '../../../src/util/util.js'

const callTracker = new assert.CallTracker()
process.on('exit', () => callTracker.verify())


test('Hero routes - endpoints test suite', async (t) => {
    await t.test('it should call /heroes:get route', async () => {
        // Isto é mock, replicar os processos da aplicação de forma local
        const databaseMock = [
            {
                "id": "3015490a-ed5c-4f6c-b14b-843ea87601f7",
                "name": "Bruce Wayne",
                "age": 50,
                "power": "rich"
            }
        ]

        const heroServiceStub = {
            find: async () => databaseMock
        }

        const endpoints = routes({ heroService: heroServiceStub })

        const endpoint = '/heroes:get'
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

    await t.todo('it should call /heroes:post route')
})