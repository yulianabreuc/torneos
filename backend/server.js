const express = require('express');
const app = express();
var createError = require('http-errors');
const cors = require('cors')

app.use(express.json());
app.use(cors());
const accederRouter = require('./routes/acceder')
const competenciasRouter = require('./routes/competencias')
const participantesRouter = require('./routes/participantes')

app.use('/sesion', accederRouter);
app.use('/api/competencias', competenciasRouter);
app.use('/api/participantes', participantesRouter);
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

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
