const express = require('express');
const router = express.Router();
const passport = require('passport');
const authMiddleware = require('../midlewares/authMidleware');


// Ruta para mostrar el formulario de login
router.get('/', (req, res) => {
  res.render('login');
});

router.post('/', passport.authenticate('local', {
  failureRedirect: '/login',
  failureFlash: true
}), (req, res) => {
  console.log("se inicio sesion correctamente, ahora se va a generar un token");

  const token = authMiddleware.generateToken(req.user.id, '1h');
  res.cookie('token', token, { httpOnly: true, secure: false });
  res.redirect('/');
});


module.exports = router;