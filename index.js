import express from 'express';
import router from './routes/index.js';
import db from './config/db.js';
import dotenv from 'dotenv';
dotenv.config({path:"variables.env"});

const app = express();

//Conectar la base de Datos
db.authenticate()
    .then(() => console.log('Base de Datos conectada') )
    .catch(error => console.log(error));

//Definir el puerto
const port = process.env.PORT || 4000;

//Habilitar PUG
app.set('view engine', 'pug');

//Obtener el año Actual
app.use((req, res, next)=> {
    const year = new Date();

    res.locals.actualYear = year.getFullYear();
    res.locals.nombresitio = "Agencia de Viajes";
    next();
});

//Agregar body parser para leer los datos del formulario
app.use(express.urlencoded({extended: true}));

//Definir la carpeta publica
app.use(express.static('public'));

//Agregar el Router
app.use('/', router);

//**Puerto y Host para la App */
const host = process.env.HOST || '0.0.0.0';
//const port = process.env.PORT || 3000;

app.listen(port, host, () => {
    console.log('El servidor esta funcionando en el puerto')
})