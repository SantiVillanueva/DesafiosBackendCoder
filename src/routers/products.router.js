const { Router} = require('express');
const ProductManager = require('../ProductManager');
const router = Router();

//Products routers
const productManager = new ProductManager('./productos.json');

//Endpoint para obtener todos los productos
router.get('/api/products', async (req, res) => {
  const limit = req.query.limit;
  let products = await productManager.getAllProducts(); 

  if (limit) {
    const parsedLimit = parseInt(limit);
    products = products.slice(0, parsedLimit);
  }

  res.json({ products });
});

// Endpoint para obtener un producto específico
router.get('/api/products/:pid', async (req, res) => {
  const productId = parseInt(req.params.pid); // Convertir el ID a número
  const product = await productManager.getProductById(productId);

  if (!product) {
    res.status(404).json({ error: 'Producto no encontrado' });
  } else {
    res.json({ product });
  }
});

//Endopoint para subir un producto
router.post('/', async (req, res) => {
    const { title, description, code, price, stock, category, thumbnails } = req.body;
  
    if (!title || !description || !code || !price || !stock || !category) {
      return res.status(400).json({ error: 'Todos los campos obligatorios deben ser proporcionados.' });
    }
  
    const product = {
      title,
      description,
      code,
      price,
      status: true,
      stock,
      category,
      thumbnails: thumbnails || []
    };
      await productManager.addProduct(product);
      res.status(200).json({ product });
  });

//Endopoint para actualizar un producto
router.put('/api/products/:pid', async (req, res) => {
    const pid = parseInt(req.params.pid);
    const updatedFields = req.body;
      await productManager.updateProduct(pid, updatedFields);
      const updatedProduct = await productManager.getProductById(pid);
      res.status(200).json(updatedProduct);
  
  });

//Endpoint para eliminar producto
router.delete('/api/products/:pid', async (req, res) => {
    const pid = parseInt(req.params.pid);
    await productManager.deleteProduct(pid);
    res.status(200).send("El producto fue eliminado");
  });
module.exports = router;