class Producto{
    #id
    #title
    #price
    #thumbnail

    constructor(id, title, price, thumbnail){
        this.#id = id
        this.#title = title
        this.#price = price
        this.#thumbnail = thumbnail
    }

    get id(){
        return this.#id
    }

    get title(){
        return this.#title
    }

    get price(){
        return this.#price
    }

    get thumbnail(){
        return this.#thumbnail
    }

    set title(title){
        this.#title = title
    }

    set price(price){
        this.#price = price
    }

    set thumbnail(thumbnail){
        this.#thumbnail = thumbnail
    }

    datos(){
        return {
            id: this.id,
            title: this.title,
            price: this.price,
            thumbnail: this.thumbnail
        }
    }

}