const express = require('express');
const session = require('express-session');
const app = express();
const path = require('path');
const dotenv = require('dotenv');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');
const { addUserToLocals } = require('./midlewares/authMidleware');

const userController = require('./controllers/userController');
const SQLiteStore = require('connect-sqlite3')(session);

app.use(flash());

dotenv.config();
app.use(cookieParser());

// Middleware para archivos estáticos de la carpeta public
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true}));

app.use(session({
    secret: process.env.ACCESS_TOKEN_SECRET, // Cambia esto por una cadena secreta aleatoria
    resave: false,
    saveUninitialized: true,
    store: new SQLiteStore({ db: 'sessionsDB.sqlite', table: 'sessions' }),
    cookie: { secure: false }
  }));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(
  { usernameField: 'email', passwordField: 'password' },
  async (email, password, done) => {
    console.log('se pasa por passport');
    try {
      const user = await userController.logearUsuario({ email, password });
      if (!user) {
        return done(null, false, { message: 'Correo o contraseña incorrecto' });
      }
      console.log('user = ', user);
      console.log('user.id = ', user.id);
      console.log('user.email = ', user.email);
      console.log('user.password = ', user.contraseña);
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  }
));

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser(async (user, done) => {
  done(null, user);
});

app.use(addUserToLocals);

const router = require('./routes/routes');
// Usar el enrutador
app.use('/', router);

// Configuración del motor de vistas Pug
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));


// Puerto del servidor
const port = process.env.SERVER_PORT;
app.listen(port, () => {
    console.log(`SERVER UP running in http://localhost:${port}`);
});
