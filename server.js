const express = require('express');
const app = express();
const path = require('path');
const router = require('./routes/routes');

// Configuración del motor de vistas Pug
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// Middleware para archivos estáticos de la carpeta public
app.use(express.static('public'));
app.use(express.json());

// Usar el enrutador
app.use('/', router);

// Puerto del servidor
const port = 3001;
app.listen(port, () => {
    console.log(`SERVER UP running in http://localhost:${port}`);
});
