export default class HeroService {
    constructor({
        heroRepository
    }) {
        this.heroRepository = heroRepository
    }

    find() {
        return this.heroRepository.find()
    }

    create(data) {
        return this.heroRepository.create(data)
    }

    alter(data) {
        return this.heroRepository.alter(data)
    }

    delete(data) {
        return this.heroRepository.delete(data)
    }
}