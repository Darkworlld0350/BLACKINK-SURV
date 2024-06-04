const encuestaModel = require('../models/crearencuestaModel');

async function crearNuevaEncuesta(user_id, titulo ,descripcion, fecha_creacion) {
    const encuesta = {
        user_id: user_id,
        titulo: titulo,
        descripcion: descripcion,
        fecha_creacion: fecha_creacion,
    };

    console.log('Encuesta = ', encuesta);
    return await encuestaModel.crearNuevaEncuesta(encuesta);
}

async function obtenerMisEncuestas(userId) {
    const encuestas = await encuestaModel.obtenerMisEncuestas(userId);
    console.log('encuestas = ', encuestas);
    return encuestas;
}

async function obtenerPreguntas(encuestaId, userId) {
    await encuestaModel.obtenerMisEncuestas(userId);

    const preguntas = {
        encuestaId: encuestaId,
        userId: userId
    };

    await encuestaModel.obtenerMisEncuestas(userId);
    const encuesta_Id = await encuestaModel.obtenerPreguntas(encuestaId);
    console.log('encuesta = ', preguntas);
    return encuesta_Id;
}

module.exports = {
    crearNuevaEncuesta,
    obtenerMisEncuestas,
    obtenerPreguntas
};