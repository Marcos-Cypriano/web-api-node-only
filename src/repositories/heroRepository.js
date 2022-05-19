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
        const currentFile = await this.#currentFileContent()
        const heroIndex = await currentFile.findIndex((hero) => hero.id == data.id)

        if (data.name) {
            currentFile[heroIndex].name = data.name
        }

        if (data.age) {
            currentFile[heroIndex].age = data.age
        }

        if (data.power) {
            currentFile[heroIndex].power = data.power
        }

        await writeFile(this.file, JSON.stringify(currentFile))

        return data.id
    }

    async delete(data) {
        const currentFile = await this.#currentFileContent()
        const heroIndex = await currentFile.findIndex((hero) => hero.id == data.id)

        currentFile.splice(heroIndex, 1)

        await writeFile(this.file, JSON.stringify(currentFile))
        return { message: "Hero deleted with success!" }
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