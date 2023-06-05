const express = require('express');
const productsRouter = require("./routers/products.router")
const cartRouter = require('./routers/carrito.router')
const app = express();

//Middlewares
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//Routers
app.use(productsRouter);
app.use(cartRouter);

//Listen
app.listen(8080, () => {
  console.log('Server is running on port 8080');
});
