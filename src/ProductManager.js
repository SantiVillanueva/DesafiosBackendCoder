const fs = require("fs");

class productManager {
  constructor() {
    this.path = './productos.json';
  }

  //Obtener productos
  async getProducts() {
      const productsData = await fs.promises.readFile(this.path, 'utf-8');
      const products = JSON.parse(productsData);
      return products;
    } 
  
  

  //agregar producto
  async addProduct(product) {
    const products = await this.getProducts();
    product.id = this.getNextId(products);
    products.push(product);
    await this.saveProducts(products);
    console.log("prueba")
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
      console.log("El producto fue actualizado");
    } else {
      console.log("No se encontró el producto con el ID especificado");
    }
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

async getProductById(id) {
  const products = await this.getAllProducts();
  const product = products.find((p) => p.id === id);
  return product;
}


//eliminar producto
async deleteProduct(id) {
  
  const products = await this.getProducts();
  
  const productIndex = products.findIndex((product) => product.id === id);
  if (productIndex !== -1) {
    products.splice(productIndex, 1);
    await this.saveProducts(products);
    return console.log("El producto fue eliminado");
  }
  return console.log("El producto no puede ser eliminado");
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