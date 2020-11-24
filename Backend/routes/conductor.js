const express = require('express');
const router = express.Router();
const mysqlConnection  = require('../db/db');

router.get('/conductor', (req, res) => {
     
    mysqlConnection.query('SELECT * FROM Conductor ', (err, rows,
      fields) => {
        if (!err) {
          res.json(rows);
        } else {
          console.log(err);
        }
      });
});
  

router.get('/conductor/:doc', (req, res) => {
  const { doc } = req.params; 
  mysqlConnection.query('SELECT * FROM conductor WHERE Documento = ?', [doc],
  (err, rows, fields) => {
    if (!err) {
      res.json(rows[0]);
    } else {
      console.log(err);
    }
  });
});  
  
  router.post('/conductor',(req,res)=>{
  
  const {Documento, Nombres, Apellidos, Empresa, Correo, Contrasena} = req.body;
  
  let datosConductor = [Documento, Nombres, Apellidos, Empresa, Correo, Contrasena];

  let nuevoConductor = `INSERT INTO Conductor (Documento, Nombres, Apellidos, Empresa, Correo, Contrasena) VALUES(?,?, ?, ?, ?, ?)`;
  mysqlConnection.query(nuevoConductor, datosConductor, (err, results,
    fields) => {
    if (err) {
      return console.error(err.message);
    }
    res.json({ message:`Conductor agregado`, })
    });
  });  
  
  router.put('/conductor/:doc', (req, res) => {
    const {Documento, Nombres, Apellidos, Empresa, Correo, Contrasena} = req.body;
    const { doc } = req.params;
    mysqlConnection.query(`UPDATE Conductor SET Documento = ?, Nombres = ?, Apellidos = ?, Empresa = ?, Correo = ?, Contrasena = ?, WHERE doc = ?`, 
    [Documento, Nombres, Apellidos, Empresa, Correo, Contrasena,doc], (err, rows, fields) => {
      if(!err) {
        res.json({status: 'Conductor actualizado'});
      } else {
        console.log(err);
      }
    });
  });
  
router.delete('/conductor/:documento', (req, res) => {
    const { documento } = req.params;
    mysqlConnection.query('DELETE FROM Conductor WHERE documento = ?',
     [documento], (err, rows, fields) => {
      if(!err) {
        res.json({status: 'Conductor eliminado!'});
      } else {
        console.log(err);
      }
    });
  });


module.exports = router;