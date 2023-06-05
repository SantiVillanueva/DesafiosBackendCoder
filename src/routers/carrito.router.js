const { Router} = require('express');
const CartManager = require("../CartManager");
const router = Router();
const cartManager = new CartManager(); 

router.post("/api/carts", (req, res) => {
  const newCart = cartManager.createCart();
  res.status(200).json(newCart);
});

// Ruta para obtener los productos de un carrito específico
router.get("/api/carts/:cid", (req, res) => {
  const { cid } = req.params;
  const cart = cartManager.getCartById(cid);
  if (cart) {
    res.status(200).json(cart.products);
  } else {
    res.status(404).json({ error: "Carrito no encontrado" });
  }
});

// Ruta para agregar un producto al carrito
router.post('/api/carts/:cid/product/:pid', (req, res) => {
    const { cid, pid } = req.params;  
    const cart = cartManager.getCartById(cid);  
    const existingProduct = cart.products.find((product) => product.id === pid);
    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      const newProduct = { id: pid, quantity: 1 };
      cart.products.push(newProduct);
    }
    cartManager.updateCart(cart);
    res.status(200).json(cart);
});

module.exports = router;