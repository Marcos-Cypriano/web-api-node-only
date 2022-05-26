import test from 'node:test'
import assert from 'node:assert'
import { promisify } from 'node:util'
import { isTypedArray } from 'node:util/types'

test('Hero Integration Test Suite', async (t) => {
    const testPort = 9009

    // It is a bad practice because it mutates the environment
    process.env.PORT = testPort
    const { server } = await import('../../src/index.js')

    const testServerAddress = `http://localhost:${testPort}/heroes`

    var id

    await t.test('should create a hero', async (t) => {
        const data = {
            name: "Batman",
            age: 51,
            power: "rich"
        }

        const request = await fetch(testServerAddress, {
            method: 'POST',
            body: JSON.stringify(data)
        })

        assert.deepStrictEqual(request.headers.get('content-type'), 'application/json')

        assert.strictEqual(request.status, 201)

        const result = await request.json()
        assert.deepStrictEqual(result.success, 'User created with success!', 'it should return a valid text message')

        id = result.id

        assert.ok(result.id.length > 30, 'id should be a valid uuid')

    })

    await t.test('should get heroes list', async (t) => {

        const request = await fetch(testServerAddress, {
            method: 'GET'
        })

        const result = await request.json()
        assert.notEqual(result.length, 0)
    })

    await t.test('should update a hero', async (t) => {

        const data = {
            id,
            name: 'Bruce Wayne',
            age: 50,
            power: 'really rich'
        }

        const request = await fetch(testServerAddress, {
            method: 'PATCH',
            body: JSON.stringify(data)
        })

        assert.deepStrictEqual(request.headers.get('content-type'), 'application/json')

        assert.strictEqual(request.status, 202)

        const result = await request.json()
        assert.deepStrictEqual(result.success, 'Hero altered with success!')
    })

    await t.test('should delete the hero created in test create a hero', async (t) => {

        const data = { id }

        const request = await fetch(testServerAddress, {
            method: 'DELETE',
            body: JSON.stringify(data)
        })

        assert.deepStrictEqual(request.headers.get('content-type'), 'application/json')

        assert.strictEqual(request.status, 202)

        const result = await request.json()
        assert.deepStrictEqual(result.success, 'Hero deleted with success!')
    })

    await t.test('should return an error', async () => {
        const data = 'Invalid payload'

        const request = await fetch(testServerAddress, {
            method: 'POST',
            body: data
        })
        
        assert.deepStrictEqual(request.headers.get('content-type'), 'application/json')

        assert.strictEqual(request.status, 500)

        const result = await request.json()
        assert.deepStrictEqual(result.error, 'internet server error!')
    })

    await promisify(server.close.bind(server))()
})