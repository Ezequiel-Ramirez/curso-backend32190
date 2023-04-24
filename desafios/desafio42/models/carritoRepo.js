export default class CarritoRepo {
    #title;
    #price;
    #description;
    #code;
    #image;
    #stock;
    #timestamp;
    #category;
    #user
  
    constructor(producto) {
      this.#title = producto.title;
      this.#price = producto.price;
      this.#description = producto.description;
      this.#code = producto.code;
      this.#image = producto.image;
      this.#stock = producto.stock;
      this.#timestamp = producto.timestamp;
      this.#category = producto.category;
      this.#user = producto.user;
    }
  
    get title() {
      return this.#title;
    }
  
    set title(title) {
      console.log(title);
      if (!title) throw new Error('"title" es un campo requerido');
      this.#title = title;
    }
  
    get price() {
      return this.#price;
    }
  
    set price(price) {
      console.log(price);
      if (!price) throw new Error('"price" es un campo requerido');
      this.#price = price;
    }
  
    get description() {
      return this.#description;
    }
  
    set description(description) {
      console.log(description);
      if (!description) throw new Error('"description" es un campo requerido');
      this.#description = description;
    }
  
    get code() {
      return this.#code;
    }
  
    set code(code) {
      console.log(code);
      if (!code) throw new Error('"code" es un campo requerido');
      this.#code = code;
    }
  
    get image() {
      return this.#image;
    }
  
    set image(image) {
      console.log(image);
      if (!image) throw new Error('"image" es un campo requerido');
      this.#image = String(image);
    }
  
    get stock() {
      return this.#stock;
    }
  
    set stock(stock) {
      console.log(stock);
      if (!stock) throw new Error('"stock" es un campo requerido');
      this.#stock = stock;
    }
  
    get timestamp() {
      return this.#timestamp;
    }
  
    set timestamp(timestamp) {
      console.log(timestamp);
      if (!timestamp) throw new Error('"timestamp" es un campo requerido');
      this.#timestamp = timestamp;
    }
    
    get category() {
      return this.#category;
    }
    
    set category(category) {
      console.log(category);
      if (!category) throw new Error('"category" es un campo requerido');
      this.#category = category;
    }
    
    get user() {
      return this.#user;
    }
    
    set user(user) {
      console.log(user);
      if (!user) throw new Error('"user" es un campo requerido');
      this.#user = user;
    }
    
    
  
    datos() {
      return JSON.parse(
        JSON.stringify({
          user: this.#user,
          products: [
            {
              title: this.#title,
              price: this.#price,
              description: this.#description,
              code: this.#code,
              image: this.#image,
              stock: this.#stock,
              timestamp: this.#timestamp,
              category: this.#category,
            },
          ],
        })
      );
    }
  }