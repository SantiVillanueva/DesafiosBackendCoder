const express = require('express');
const fs = require('fs');
const router = express.Router();


router.get('/realtimeproducts', (req, res) => {
  fs.readFile('productos.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error al leer el archivo JSON');
      return;
    }
    const products = JSON.parse(data);
    res.render('realTimeProducts', { products });
  });
});
/*
const socketServer = io()
socketServer.on('connection', (socket) => {
  console.log('Cliente conectado');

  fs.readFile('productos.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    const products = JSON.parse(data);
    socket.emit('updateProducts', products);
  });
});
*/
module.exports = router;

