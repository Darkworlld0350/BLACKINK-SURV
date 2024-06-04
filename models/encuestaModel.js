const axios = require('axios');

class Encuesta {
    constructor(id, titulo, descripcion, fecha_creacion, user_id) {
        this.id = id;
        this.titulo = titulo;
        this.descripcion = descripcion;
        this.fecha_creacion = fecha_creacion;
        this.user_id = user_id;
    }
}

async function insertEncuesta(encuesta) {
    try {
        console.log('objeto usuarios siendo recibida por el modelo = ',encuesta);
        await axios.post(`${process.env.BASE_URL}/encuesta/registrarEncuesta`, { encuesta });
        console.log('se pudo registrar el usuario', encuesta);
    } catch (error) {
        console.error('Error al registrar usuario:', error.message);
    }
}

async function logearUsuario(dataSegura) {
    try {
        console.log('se logea el usuario');                                  
        const response = await axios.post(`${process.env.BASE_URL}/usuarios/login`, {dataSegura});
        const usuario = response.data;
        console.log("Se inicio sesion");
        console.log('new Usuario = ', usuario);
        return new Usuario(usuario.id, usuario.nombre, usuario.nombre, usuario.email, usuario.contraseña);
    } catch (error) {
        console.error('Error al obtener usuario por nombre:', error.message);
    }
}


module.exports = {
    registrarUsuario,
    logearUsuario,
    Usuario,
    insertEncuesta
};
