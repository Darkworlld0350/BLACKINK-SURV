const { getEncuestasConPreguntas, insertEncuesta } = require('../models/crearencuestaModel');

// Controlador para generar el informe
exports.generarInforme = async (req, res) => {
  try {
    const encuestas = await getEncuestasConPreguntas();

    const encuestasMap = {};
    encuestas.forEach(row => {
      if (!encuestasMap[row.encuesta_id]) {
        encuestasMap[row.encuesta_id] = {
          id: row.encuesta_id,
          titulo: row.titulo,
          preguntas: [],
        };
      }
      if (row.pregunta_id) {
        encuestasMap[row.encuesta_id].preguntas.push({
          id: row.pregunta_id,
          tipo: row.tipo,
          pregunta: row.pregunta,
          opciones: row.opciones ? row.opciones.split(',') : [],
        });
      }
    });

    const encuestasArray = Object.values(encuestasMap);
    res.render('informe', { encuestas: encuestasArray });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Controlador para crear una nueva encuesta
exports.crearNuevaEncuesta = async (user_id, titulo, descripcion, fecha_creacion) => {
  try {
    const encuesta = {
      user_id: user_id,
      titulo: titulo,
      descripcion: descripcion,
      fecha_inicio: fecha_creacion
    };

    // Inserta la encuesta en la base de datos
    await insertEncuesta(encuesta);
  } catch (error) {
    console.error('Error al crear la encuesta:', error);
    throw new Error('Error al crear la encuesta');
  }
};

module.exports = {
  generarInforme,
  crearNuevaEncuesta
};
