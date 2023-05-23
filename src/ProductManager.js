const fs = require("fs");

class productManager {
  constructor() {
    this.path = './productos.json';
  }

  async addProduct(product) {
    const products = await this.getProducts();
    product.id = this.getNextId(products);
    products.push(product);
    await this.saveProducts(products);
  }

  //actualizar productos
  async updateProduct(id, updatedFields) {
    const products = await this.getProducts();
    const product = products.find((product) => product.id === id);
    if (product) {
      for (const key in updatedFields) {
        if (updatedFields.hasOwnProperty(key)) {
          product[key] = updatedFields[key];
        }
      }
      await this.saveProducts(products);
      return console.log("El producto fue actualizado");
      
    }
    return console.log("No se encontró el producto con el ID especificado");
  }
  
// Función para leer el archivo de productos
async readProductsFile() {
  const productsData = await fs.promises.readFile(this.path, 'utf-8');
  const products = JSON.parse(productsData);
  return products;
}


async getAllProducts() {
  const productsData = await fs.promises.readFile(this.path, 'utf-8');
  const products = JSON.parse(productsData);
  return products;
}

async getProductById(productId) {
  const products = await this.getAllProducts();
  const product = products.find((p) => p.id === productId);
  return product;
}

  
//genera un Id unico 
  getNextId(products) {
    if (products.length === 0) {
      return 1;
    }
    const maxId = Math.max(...products.map((product) => product.id));
    return maxId + 1;
  }

  async saveProducts(products) {
    await fs.promises.writeFile(this.path, JSON.stringify(products, null, 2));
  }
}

module.exports = productManager;