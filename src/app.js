const express = require('express');
const ProductManager = require('./ProductManager');
const app = express();

const productManager = new ProductManager('./productos.json');

app.get('/products', async (req, res) => {
  const limit = req.query.limit;
  let products = await productManager.getAllProducts(); // Esperar a que se completen las operaciones asincrónicas

  if (limit) {
    const parsedLimit = parseInt(limit);
    products = products.slice(0, parsedLimit);
  }

  res.json({ products });
});

// Endpoint para obtener un producto específico
app.get('/products/:pid', async (req, res) => {
  const productId = parseInt(req.params.pid); // Convertir el ID a número
  const product = await productManager.getProductById(productId);

  if (!product) {
    res.status(404).json({ error: 'Producto no encontrado' });
  } else {
    res.json({ product });
  }
});

app.listen(8080, () => {
  console.log('Server is running on port 8080');
});
