const express = require('express');
const router = express.Router();

const index = require('./index'); // Asegúrate de que este archivo tenga la ruta raíz '/'
const bootstrap = require('./bootstrap');
const login = require('./login');
const encuesta = require('./encuesta');
const registrarUsuario = require('./registrar-usuario');
const logout = require('./logout');
const profile = require('./profile');
const crearencuesta = require('./crearencuesta');

router.use('/', index);
router.use('/bootstrap', bootstrap);
router.use('/login', login);
router.use('/registrar-usuario', registrarUsuario);
router.use('/logout', logout);
router.use('/profile', profile);
router.use('/encuesta', encuesta);
router.use('/crearencuesta', crearencuesta);

module.exports = router;

