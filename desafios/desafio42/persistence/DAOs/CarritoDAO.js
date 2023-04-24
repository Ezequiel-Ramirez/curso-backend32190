import mongoose from "mongoose";
import * as carritoModel from "../../models/carrito.js";
import { transformarADTO } from "../DTOs/CarritoDTO.js";

class CarritoDAOMongoDB {
  constructor(url) {
    this.url = url;
  }

  async connect() {
    try {
      await mongoose.connect(this.url, {
        useNewUrlParser: true,
      });
    } catch (error) {
      console.log(error);
    }
  }

  async getById(id) {
    try {
      await this.connect();

      const producto = await carritoModel.carritos.findOne({ _id: id });

      return transformarADTO(producto);
    } catch (error) {
      console.log(error);
    }
  }

  async deleteById(id) {
    try {
      await this.connect();

      const producto = await carritoModel.carritos.deleteOne({ _id: id });

      console.log(producto);

      return transformarADTO(producto);
    } catch (error) {
      console.log(error);
    }
  }

  async updateById(id, newData) {
    try {
      await this.connect();

      const producto = await carritoModel.carritos.updateOne(
        { _id: id },
        {
          $set: { ...newData },
        }
      );

      console.log(producto);
      return transformarADTO(producto);
    } catch (error) {
      console.log(error);
    }
  }

  async save(object) {
    try {
      await this.connect();

      const producto = new carritoModel.carritos(object);

      const saved = await producto.save();

      console.log(saved._id);
      return saved._id;
    } catch (error) {
      console.log(error);
    }
  }

  async getAll() {
    try {
      await this.connect();

      const productos = await carritoModel.carritos
        .find({}, { __v: 0 })
        .lean();
      return productos;
    } catch (error) {
      console.log(error);
    }
  }
}

export default { CarritoDAOMongoDB };
