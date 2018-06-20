var express = require('express');
var app = express();
var registrosRoutes = express.Router();

var Registro = require('../models/Registro');

// Create
registrosRoutes.route('/adicionar').post(function (req, res) 
{
    var registro = new Registro(req.body);
   
    registro.save()
    .then(item => 
    {
        res.status(200).json({'registro': 'Registro adicionado com sucesso!'});
    })
    .catch(err => 
    {
        res.status(400).send("Ocorreu um erro...");
    });
});

// Read
registrosRoutes.route('/').get(function (req, res) 
{
    Registro.find(function (err, registros)
    {
        if(err)
        {
            console.log(err);
        }
        else 
        {
            res.json(registros);
        }
    });
});

// Edit
registrosRoutes.route('/edit/:id').get(function (req, res) 
{
    var id = req.params.id;
    Registro.findById(id, function (err, registro)
    {
        res.json(registro);
    });
});

//  Update
registrosRoutes.route('/update/:id').post(function (req, res) 
{
   Registro.findById(req.params.id, function(err, registro) 
   {
        if (!registro)
        {
            return next(new Error('Não foi possível ler'));
        }
        else 
        {
            registro.name = req.body.name;
            registro.mesa = req.body.mesa;
            registro.consumivel = req.body.consumivel;

            registro.save().then(registro => 
            {
                res.json('Registro atualizado com sucesso!');
            })
            .catch(err => 
            {
                res.status(400).send("não foi possível atualizar a comanda");
            });
        }
  });
});

// Delete
registrosRoutes.route('/delete/:id').get(function (req, res) 
{
    Registro.findByIdAndRemove({_id: req.params.id}, function(err, registro)
    {
        if (err)
        {
            res.json(err);
        } 
        else 
        {
            res.json('Registro removido com sucesso!');
        }
    });
});

module.exports = registrosRoutes;