const express = require('express');
const app = express();
const estudiante = require('./routes/estudiante');
const conductor = require('./routes/conductor');


// Ajustes
app.set('port',3000);
app.set('json spaces',2);

// Middlewares
app.use(express.json());

// Routes//
app.use('/api',estudiante);
app.use('/api',conductor);

// Ajustes del servidor
app.listen(app.get('port'), () => {
  console.log(`Servidor corriendo en el puerto ${app.get('port')}`);
});