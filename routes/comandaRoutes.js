var express = require('express');
var app = express();
var comandaRoutes = express.Router();

var Comanda = require('../models/Comanda');

// Create
comandaRoutes.route('/adicionar').post(function (req, res) 
{
    var comanda = new Comanda(req.body);
   
    comanda.save()
    .then(item => 
    {
        res.status(200).json({'comanda': 'Comanda adicionada com sucesso!'});
    })
    .catch(err => 
    {
        res.status(400).send("Ocorreu um erro...");
    });
});

// Read
comandaRoutes.route('/').get(function (req, res) 
{
    Comanda.find(function (err, comandas)
    {
        if(err)
        {
            console.log(err);
        }
        else 
        {
            res.json(comandas);
        }
    });
});

// Edit
comandaRoutes.route('/edit/:id').get(function (req, res) 
{
    var id = req.params.id;
    Comanda.findById(id, function (err, comanda)
    {
        res.json(comanda);
    });
});

//  Update
comandaRoutes.route('/update/:id').post(function (req, res) 
{
   Comanda.findById(req.params.id, function(err, comanda) 
   {
        if (!comanda)
        {
            return next(new Error('Não foi possível ler'));
        }
        else 
        {
            comanda.name = req.body.name;
            comanda.mesa = req.body.mesa;
            comanda.consumivel = req.body.consumivel;

            comanda.save().then(comanda => 
            {
                res.json('Comanda atualizada com sucesso!');
            })
            .catch(err => 
            {
                res.status(400).send("não foi possível atualizar a comanda");
            });
        }
  });
});

// Delete
comandaRoutes.route('/delete/:id').get(function (req, res) 
{
    Comanda.findByIdAndRemove({_id: req.params.id}, function(err, comanda)
    {
        if (err)
        {
            res.json(err);
        } 
        else 
        {
            res.json('Comanda removida com sucesso!');
        }
    });
});

module.exports = comandaRoutes;