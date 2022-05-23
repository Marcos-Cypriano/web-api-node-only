import { randomUUID } from 'node:crypto'

export default class Hero {
    constructor ({ name, age, power }) {
        Object.assign(this, {
            id: randomUUID(),
            name,
            age,
            power
        })
    }
}