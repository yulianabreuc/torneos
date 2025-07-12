const express = require('express');
const app = express();
var createError = require('http-errors');
const cors = require('cors')

app.use(express.json());
app.use(cors());
const accederRouter = require('./routes/acceder')
app.use('/sesion', accederRouter);
//base de datos
var db = require('./conexion/conexion');


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// Ruta básica (endpoint)
app.get('/', (req, res) => {
  res.send('¡Hola, mundo desde Express!');
});


db();

const PORT = process.env.PORT || 30000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
