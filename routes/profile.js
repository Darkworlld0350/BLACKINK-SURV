const express = require('express');
const router = express.Router();

// Definir la ruta para la página principal
router.get('/', (req, res) => {
  res.render('profile'); // Puedes cambiar esto para renderizar una vista Pug si es necesario
});


module.exports = router;


