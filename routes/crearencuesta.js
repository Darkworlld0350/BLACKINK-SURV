const express = require('express');
const router = express.Router();
const crearEncuestaController = require('../controllers/crearencuestaController');

// Definir la ruta para la creación de encuestas
router.post('/', async (req, res) => {
    try {
        console.log("Aquí se está creando una Encuesta");
        console.log(req.body);
        console.log("req.user = ", req.user);

        // Asegurarse de que req.user existe y tiene un id
        if (!req.user || !req.user.id) {
            return res.status(401).send({ message: 'Usuario no autenticado' });
        }

        const user_id = req.user.id;
        const { titulo, descripcion, fecha_inicio } = req.body;

        // Validar los datos antes de proceder
        if (!titulo || !descripcion || !fecha_inicio) {
            return res.status(400).send({ message: 'Todos los campos son requeridos' });
        }

        // Llamar al controlador para crear la encuesta
        const resultado = await crearEncuestaController.crearNuevaEncuesta(user_id, titulo, descripcion, fecha_inicio);
        
        res.status(201).send({ message: 'Encuesta creada exitosamente', data: resultado });
    } catch (error) {
        console.error('Error al crear la encuesta:', error);
        res.status(500).send({ message: 'Error interno del servidor' });
    }
});

module.exports = router;
