const express = require('express');
const router = express.Router();

// Página de inicio
router.get('/', (req, res) => {
  res.render('index', { title: 'Encuesta de Satisfacción del Cliente' });
});

// Ruta para manejar la encuesta
router.post('/submit-survey', (req, res) => {
  const { favorite_color, satisfaction, opinion } = req.body;

  console.log(req.body);

  // Validación y manejo de datos
  if (favorite_color && satisfaction && opinion) {
    // Almacenar las respuestas en la base de datos (ejemplo)
    // db.collection('responses').insertOne({ favorite_color, satisfaction, opinion });

    res.send(`Color favorito: ${favorite_color}, Satisfacción: ${satisfaction}, Opinión: ${opinion}`);
  } else {
    res.status(400).send('Faltan datos en la encuesta');
  }
});

module.exports = router;
