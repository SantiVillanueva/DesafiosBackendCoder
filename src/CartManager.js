const fs = require("fs");

class CartManager {
  constructor() {
    this.path = "./carrito.json";
  }

  // Obtener todos los carritos
  getAllCarts() {
    try {
      const cartData = fs.readFileSync(this.path, "utf-8");
      const carts = JSON.parse(cartData);
      return carts;
    } catch (error) {
      console.log("Ocurrió un error al obtener los carritos:", error);
      return [];
    }
  }
  // Actualizar un carrito
  updateCart(cart) {
    const carts = this.getAllCarts();
    const cartIndex = carts.findIndex((c) => c.id === cart.id);
    if (cartIndex !== -1) {
      carts[cartIndex] = cart;
      this.saveCarts(carts);
      console.log("El carrito fue actualizado");
    } else {
      console.log("No se encontró el carrito con el ID especificado");
    }
  }
  // Guardar los carritos en el archivo
  saveCarts(carts) {
    try {
      fs.writeFileSync(this.path, JSON.stringify(carts, null, 2));
    } catch (error) {
      console.log("Ocurrió un error al guardar los carritos:", error);
    }
  }

  // Generar un ID único para el carrito
  generateCartId() {
    const carts = this.getAllCarts();
    if (carts.length === 0) {
      return 1;
    }
    const maxId = Math.max(...carts.map((cart) => cart.id));
    return maxId + 1;
  }

  // Crear un nuevo carrito
  createCart() {
    const carts = this.getAllCarts();
    const cartId = this.generateCartId();
    const cart = { id: cartId, products: [] };
    carts.push(cart);
    this.saveCarts(carts);
    return cart;
  }

  // Obtener un carrito por su ID
  getCartById(cartId) {
    const carts = this.getAllCarts();
    const cart = carts.find((cart) => cart.id === cartId);
    return cart;
  }

  // Agregar un producto al carrito
  addProductToCart(cartId, productId, quantity) {
    const carts = this.getAllCarts();
    const cart = this.getCartById(cartId);
    if (cart) {
      // Verificar si el producto ya existe en el carrito
      const existingProduct = cart.products.find(
        (product) => product.id === productId
      );
      if (existingProduct) {
        existingProduct.quantity += quantity;
      } else {
        cart.products.push({ id: productId, quantity });
      }
      this.saveCarts(carts);
      console.log("Producto agregado al carrito");
    } else {
      console.log("No se encontró el carrito con el ID especificado");
    }
  }
}

module.exports = CartManager;
