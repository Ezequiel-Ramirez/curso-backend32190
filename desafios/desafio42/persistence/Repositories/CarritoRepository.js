import CarritoDaoFactory from "../Factories/CarritoDAOFactory.js";
import { transformarADTO } from "../DTOs/CarritoDTO.js";
import CarritoRepo from "../../models/carritoRepo.js";

export default class CarritoRepository {
  dao;

  constructor() {
    this.dao = CarritoDaoFactory.getDao();
  }

  async getAll() {
    const productos = await this.dao.getAll();
    return productos.map((p) => p);
  }

  async getById(id) {
    const producto = await this.dao.getById(id);
    return producto;
  }

  async save(nuevo) {
    return await this.dao.save(transformarADTO(nuevo));
  }

  async updateById(id, nuevo) {
    const producto = await this.dao.updateById(id, nuevo);
    return new CarritoRepo(producto);
  }

  async deleteById(id) {
    const producto = await this.dao.deleteById(id);
    return new CarritoRepo(producto);
  }
}