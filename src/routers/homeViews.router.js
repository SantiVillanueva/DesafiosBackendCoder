const { Router } = require("express");
const fs = require('fs');
const router = Router()

router.get('/', (req, res) => {
    fs.readFile('productos.json', 'utf8', (err, data) => {
      if (err) {
        console.error(err);
        res.status(500).send('Error al leer el archivo JSON');
        return;
      }
      const products = JSON.parse(data);
      res.render('home', { products });
    });
  });
  module.exports = router;