const express = require('express');
const app = express();
const path = require('path');
const router = require('./routes/routes');
const logger = require('morgan');
const bodyParser = require('body-parser');

// Configuración del motor de vistas Pug
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// Middleware para archivos estáticos de la carpeta public
app.use(express.static('public'));
app.use(express.json());

// Middlewares
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Manejo de errores
/*app.use((req, res, next) => {
    res.status(404).send("Lo siento, no encontramos esa ruta.");
  });
  
  app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.send('Error en el servidor');
  });
*/
// Usar el enrutador
app.use('/', router);

// Puerto del servidor
const port = 3001;
app.listen(port, () => {
    console.log(`SERVER UP running in http://localhost:${port}`);
});
