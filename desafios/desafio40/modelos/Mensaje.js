class Mensaje {
    #id
    #author
    #text
    #date

    constructor(id, author, text, date) {
        this.#id = id
        this.#author = author
        this.#text = text
        this.#date = date
    }

    get id() {
        return this.#id
    }

    set id(id) {
        if (!id) throw new Error('"id" es un campo requerido')
        this.#id = id
    }

    get author() {
        return this.#author
    }

    set author(author) {
        if (!author) throw new Error('"author" es un campo requerido')
        this.#author = author
    }

    get text() {
        return this.#text
    }

    set text(text) {
        if (!text) throw new Error('"text" es un campo requerido')
        this.#text = text
    }

    get date() {
        return this.#date
    }

    set date(date) {
        if (!date) throw new Error('"date" es un campo requerido')
        this.#date = date
    }

    datos() {
        return JSON.parse(JSON.stringify({
            id: this.#id,
            author: this.#author,
            text: this.#text,
            date: this.#date
        }))

        }
}

module.exports = Mensaje