var PORT = 3000;
var express = require('express');
var app = express();
var mysql = require('./mysql');
app.use(express.json()); // para parsear application/json
app.use(express.static('.')); // para servir archivos estaticos


/* ******************************************************************* 
 * Obtener dispositivos por ID
 * *******************************************************************/
app.get('/devices/:id', function(req, res, next) {
    mysql.query('SELECT * FROM Devices WHERE id=?', [req.params.id], function(err, rta, field) {
        if (err) {
            res.send(err).status(400);
            return;
        }
        res.send(rta);
    });
});

/* ******************************************************************* 
 * Obtener dispositivos por filtro
 *
 * filter = 0 -> Obtiene todos los dispositivos
 * filter = 1 -> Obtiene las lamparas
 * filter = 2 -> Obtiene las persianas
 * filter = 3 -> Obtiene los veladores
 * *******************************************************************/
app.get('/devices', function(req, res, next) {

    var filter = req.query.filter || 0;
    filter = Number(filter);

    if (filter == 1 || filter == 2 || filter == 3) {
        mysql.query('SELECT * FROM Devices WHERE type=?', [filter - 1], function(err, rta, field) {
            if (err) {
                res.send(err).status(400);
                return;
            }

            res.send(rta);
        });
    } else {
        mysql.query('SELECT * FROM Devices', function(err, rta, field) {
            if (err) {
                res.send(err).status(400);
                return;
            }
            res.send(rta).status(200);
        });
    }
});

/* ******************************************************************* 
 * Actualiza el estado del dispositivo
 * *******************************************************************/
app.post('/devices', function(req, res, next) {

    console.log(req.body);

    st = 0;
    if (req.body.state)
        st = 1;

    id = req.body.id.split("_")[1]; // viene dev_xx

    mysql.query('UPDATE Devices SET state=? WHERE id=?', [st, id], function(err, rta, field) {
        if (err) {
            res.send(err).status(400);
            return;
        }
        res.send(JSON.stringify(req.body));
    });
});


app.listen(PORT, function(req, res) {
    console.log("API funcionando en el puerto " + PORT);
});