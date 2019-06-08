var express = require('express');
var app = express();
var abertaRoutes = express.Router();

var Aberta = require('../models/Aberta');

// Create
abertaRoutes.route('/adicionar').post(function (req, res) 
{
    var aberta = new Aberta(req.body);
   
    aberta.save()
    .then(item => 
    {
        res.status(200).json({'aberta': 'Aberta adicionada com sucesso!'});
    })
    .catch(err => 
    {
        res.status(400).send("Ocorreu um erro...");
    });
});

// Read
abertaRoutes.route('/').get(function (req, res) 
{
    Aberta.find(function (err, abertas)
    {
        if(err)
        {
            console.log(err);
        }
        else 
        {
            res.json(abertas);
        }
    });
});

// Edit -GET
abertaRoutes.route('/edit/:id').get(function (req, res) 
{
    var id = req.params.id;
    Aberta.findById(id, function (err, aberta)
    {
        res.json(aberta);
    });
});

//  Update
abertaRoutes.route('/update/:id').post(function (req, res) 
{
   Aberta.findById(req.params.id, function(err, aberta) 
   {
        if (!aberta)
        {
            return next(new Error('Não foi possível ler'));
        }
        else 
        {
            aberta.name = req.body.name;
            aberta.mesa = req.body.mesa;
            aberta.consumidos = req.body.consumidos;

            aberta.save().then(aberta => 
            {
                res.json('Aberta atualizada com sucesso!');
            })
            .catch(err => 
            {
                res.status(400).send("não foi possível atualizar a comanda");
            });
        }
  });
});

// Delete
abertaRoutes.route('/delete/:id').get(function (req, res) 
{
    Aberta.findByIdAndRemove({_id: req.params.id}, function(err, aberta)
    {
        if (err)
        {
            res.json(err);
        } 
        else 
        {
            res.json('Comanda fechada com sucesso!');
        }
    });
});

module.exports = abertaRoutes;