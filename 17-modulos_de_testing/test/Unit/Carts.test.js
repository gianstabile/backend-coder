import chai from "chai";
import mongoose from "mongoose";
import config from "../../src/config/config.js";
import CartManager from "../../src/dao/db/cart.dao.js";
import { CartsMock } from "../mocks/carts.mocks.js";

const expect = chai.expect;

const {
  mongo: { dbTestUrl },
} = config;

describe("Pruebas del módulo de carritos", () => {
  before(function () {
    mongoose.connect(dbTestUrl);
    this.cartDao = new CartManager();
    this.cartMock = new CartsMock();
  });
  beforeEach(function () {
    mongoose.connection.collections.carts.drop();
  });

  it("El dao debe crear un carrito", async function () {
    const cartMock = this.cartMock.cart();
    const result = await this.cartDao.addCart(cartMock);

    expect(result).to.be.an("object");
    expect(result).to.be.ok;
    expect(result).to.have.property("_id");
  });

  it("El dao debe agregar un producto a un carrito", async function () {
    const cartMock = this.cartMock.cart();
    const productMock = this.productMock.product();
    const cart = await this.cartDao.addCart(cartMock);
    const result = await this.cartDao.addProductToCart(cart._id, productMock);

    expect(result).to.be.ok;
    expect(result.quantity === 1);
    expect(result.total === productMock.price);
  });

  it("El dao debe eliminar un producto de un carrito", async function () {
    const cartMock = this.cartMock.cart();
    const productMock = this.productMock.product();
    const cart = await this.cartDao.addCart(cartMock);
    const result = await this.cartDao.addProductToCart(cart._id, productMock);
    const deleteProduct = await this.cartDao.deleteProductFromCart(cart._id, productMock);

    expect(deleteProduct).to.be.ok;
    expect(result.quantity === 0);
    expect(result.total === 0);
  });

  it("El dao debe verificar un carrito", async function () {
    const cartMock = this.cartMock.cart();
    const productMock = this.productMock.product();
    const cart = await this.cartDao.addCart(cartMock);
    const result = await this.cartDao.checkCart(cart._id);

    expect(result).to.be.ok;
    expect(result.total === 0);
  });

  it("El dao debe eliminar un carrito", async function () {
    const cartMock = this.cartMock.cart();
    const cart = await this.cartDao.addCart(cartMock);
    const deleteCart = await this.cartDao.deleteCart(cart._id);

    expect(deleteCart).to.be.ok;
  });
});
