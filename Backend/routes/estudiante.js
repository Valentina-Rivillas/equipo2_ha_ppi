const express = require('express');
const router = express.Router();
const mysqlConnection  = require('../db/db');

router.get('/estudiantes', (req, res) => {
     
    mysqlConnection.query('SELECT * FROM estudiante ', 
    (err, rows,
      fields) => {
        if (!err) {
          res.json(rows);
        } else {
          console.log(err);
        }
      });
});
  

router.get('/estudiantes/:doc', (req, res) => {
  const { doc } = req.params; 
  mysqlConnection.query(`SELECT * FROM estudiante 
  WHERE Documento = ?`, [doc],
  (err, rows, fields) => {
    if (!err) {
      res.json(rows[0]);
    } else {
      console.log(err);
    }
  });
});  
  

router.post('/estudiante',(req,res)=>{   
  const {Documento, Nombres, Apellidos, Grado, Correo, Contrasena} = req.body;
  
 let datosEstudiante = [Documento, Nombres, Apellidos, Grado, Correo, Contrasena];

  let nuevoEstudiante = `INSERT INTO estudiante(Documento, Nombres, Apellidos, Grado, Correo, Contrasena) VALUES(?,?,?,?,?,?)`;
  mysqlConnection.query(nuevoEstudiante, datosEstudiante, (err, results,
    fields) => {
    if (err) {
      return console.error(err.message);
    }
    res.json({ message:`Registro exitoso`, })
    });
  });  


router.put('/estudiantes/:documento', (req, res) => {
  const {Documento, Nombres, Apellidos, Grado, Correo,Contrasena} = req.body;
  const { documento } = req.params;
  mysqlConnection.query(`UPDATE estudiante SET Documento =?, Nombres = ?, Apellidos = ?, Grado = ?,
  Correo = ?, Contrasena = ? WHERE Documento = ?`, 
  [Documento, Nombres, Apellidos, Grodo, Correo, Contrasena], (err, rows, fields) => {
    if(!err) {
      res.json({status: 'Estudiante actualizado'});
    } else {
      console.log(err);
    }
  });
});
  
   
router.delete('/estudiante/:documento', (req, res) => {
  const { documento } = req.params;
  mysqlConnection.query('DELETE FROM estudiante WHERE documento = ?',
   [documento], (err, rows, fields) => {
    if(!err) {
      res.json({status: 'Estudiante eliminado!'});
    } else {
      console.log(err);
    }
  });
});

module.exports = router;