const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleWare = require('../midlewares/authMidleware');

// Ruta para manejar el registro de usuarios
router.post('/', async (req, res) => {
    const { nombre, usuario, email, password, confirmPassword } = req.body;

    // Verificar si la contraseña y su confirmación coinciden
    if (password !== confirmPassword) {
        return res.status(400).send('Las contraseñas no coinciden');
    }

    try {

        // Hash de la contraseña
        const password_hash = await authMiddleWare.getHash(password);

        // Registrar el usuario en la base de datos
        await userController.registrarUsuario(nombre, usuario, email, password_hash);

        // Usuario insertado correctamente
        res.redirect('/login');
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Error interno del servidor');
    }
});

module.exports = router;