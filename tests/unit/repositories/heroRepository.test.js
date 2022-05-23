import test from 'node:test'
import assert from 'node:assert'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

import { generateInstance } from '../../../src/factories/heroFactory.js'

test('Hero Repository - functions test suite', async (t) => {
    const currentDir = dirname(fileURLToPath(import.meta.url))
    const filePath = join(currentDir, './../../../database', 'dataTest.json')
    const heroService = generateInstance({ filePath })

    const hero = {
        "id":"fce38aef-8d88-43bb-aa7a-8f0b6c26f0fa",
        "name":"Batman",
        "age":50,
        "power":"rich"
    }

    await t.test('should create a new hero on dataTest', async () => {
        const id = await heroService.create(hero)
        assert.equal(id, hero.id)
    })

    await t.test('should alter the hero name', async () => {
        const alterHero = {
            "id":"fce38aef-8d88-43bb-aa7a-8f0b6c26f0fa",
            "name":"Bruce Wayne" 
        }
        const id = await heroService.alter(alterHero)
        assert.equal(id, hero.id)
    })

    await t.test('should list the heroes on dataTest', async () => {
        const expected = [{
            "id":"fce38aef-8d88-43bb-aa7a-8f0b6c26f0fa",
            "name":"Bruce Wayne",
            "age":50,
            "power":"rich"
        }]
        const result = await heroService.find()

        assert.deepEqual(result, expected)
    })

    await t.test('should delete a hero from the dataTest.json', async () => {
        const expected = { message: "Hero deleted with success!"  }
        const result = await heroService.delete(hero)
        assert.deepEqual(result, expected)
    })

})