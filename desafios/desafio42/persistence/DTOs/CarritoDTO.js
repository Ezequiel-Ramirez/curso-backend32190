export default class CarritoDTO {
  constructor(user, products) {
    this.user = user;
    this.products = products?.map(producto => {
      const { title, price, description, code, image, stock, timestamp, category } = producto;
      return { title, price, description, code, image, stock, timestamp, category };
    });
  }
}

export function transformarADTO(carrito) {
  const { user, products } = carrito;
  return new CarritoDTO(user, products);
}
