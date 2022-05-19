import { readFile, writeFile } from 'node:fs/promises'

export default class HeroRepository {
    constructor({
        file
    }) {
        this.file = file
    }

    async #currentFileContent() {
        return JSON.parse(await readFile(this.file))
    }

    find() {
        return this.#currentFileContent()
    }

    async create(data) {
        const currentFile =  await this.#currentFileContent()
        currentFile.push(data)

        await writeFile(this.file, JSON.stringify(currentFile))

        return data.id
    }

    async alter(data) {
        console.log(data)
        const currentFile = await this.#currentFileContent()
        const hero = await currentFile.find((hero) => hero.id == data.id)

        if (data.name) {
            hero.name = data.name
        }

        if (data.age) {
            hero.age = data.age
        }

        if (data.power) {
            hero.power = data.power
        }

        await writeFile(this.file, JSON.stringify(currentFile))

        return data.id
    }

    async delete(data) {
        const currentFile = await this.#currentFileContent()

        try{
            await currentFile.delete((hero) => hero.id == data.id)

            return JSON.stringify({
                message: "Hero deleted with success!"
            })
        } catch (err) {
            return JSON.stringify({
                error: err
            })
        }
    }
}

// const heroRepository = new HeroRepository({
//     file: './../database/data.json'
// })

// console.log( await heroRepository.create({
//     id: 2,
//     name: 'Chapolin'
// }))

// console.log( await heroRepository.find() )