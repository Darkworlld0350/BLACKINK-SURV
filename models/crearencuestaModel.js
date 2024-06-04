const axios = require('axios');

class Encuesta {
    constructor(id, titulo, descripcion, fecha_creacion, usuario_id) {
        this.id = id;
        this.titulo = titulo;
        this.descripcion = descripcion;
        this.fecha_creacion = fecha_creacion;
        this.usuario_id = usuario_id;
    }
}

async function crearNuevaEncuesta(newEncuesta) {
    try {
        console.log("crearNuevaEncuesta model = ", newEncuesta);
        const response = await axios.post(`${process.env.BASE_URL}/encuesta/createNew`, newEncuesta);
        if (response.status === 201) {
            console.log('Se creó la Encuesta Correctamente');
        } else {
            console.error('Error al crear la encuesta:', response.status, response.data);
        }
    } catch (error) {
        console.error('Error al crear encuesta:', error.message);
    }
}

async function obtenerMisEncuestas(usuarioId) {
    try {
        console.log('usuarioId en mi modelo = ', usuarioId);
        const response = await axios.get(`${process.env.BASE_URL}/encuesta/getAll`, { params: { userId: usuarioId } });
        
        if (response.status === 200) {
            console.log('response = ', response.data);
            if (Array.isArray(response.data)) {
                const encuestas = response.data.map(encuesta => new Encuesta(
                    encuesta.id,
                    encuesta.titulo,
                    encuesta.descripcion,
                    encuesta.fecha_creacion,
                    encuesta.usuario_id
                ));
                return encuestas;
            } else {
                console.error('La respuesta no es un array:', response.data);
                return [];
            }
        } else {
            console.error('Error al obtener encuestas:', response.status, response.data);
            return [];
        }
    } catch (error) {
        console.error('Error al obtener encuestas:', error.message);
        return [];
    }
}

module.exports = {
    Encuesta,
    crearNuevaEncuesta,
    obtenerMisEncuestas
};
