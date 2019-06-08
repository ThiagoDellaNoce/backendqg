var express = require('express');
var app = express();
var arquivadaRoutes = express.Router();

var Arquivada = require('../models/Arquivada');

// Create
arquivadaRoutes.route('/adicionar').post(function (req, res) 
{
    var arquivada = new Arquivada(req.body);
   
    arquivada.save()
    .then(item => 
    {
        res.status(200).json({'arquivada': 'Comanda arquivada adicionada com sucesso!'});
    })
    .catch(err => 
    {
        res.status(400).send("Ocorreu um erro...");
    });
});

// Read
arquivadaRoutes.route('/').get(function (req, res) 
{
    Arquivada.find(function (err, arquivadas)
    {
        if(err)
        {
            console.log(err);
        }
        else 
        {
            res.json(arquivadas);
        }
    });
});

// Edit -GET
arquivadaRoutes.route('/edit/:id').get(function (req, res) 
{
    var id = req.params.id;
    Arquivada.findById(id, function (err, arquivada)
    {
        res.json(arquivada);
    });
});

//  Update
arquivadaRoutes.route('/update/:id').post(function (req, res) 
{
   Arquivada.findById(req.params.id, function(err, arquivada) 
   {
        if (!arquivada)
        {
            return next(new Error('Não foi possível ler'));
        }
        else 
        {
            arquivada.name = req.body.name;
            arquivada.mesa = req.body.mesa;
            arquivada.consumidos = req.body.consumidos;

            arquivada.save().then(arquivada => 
            {
                res.json('Comanda arquivada atualizada com sucesso!');
            })
            .catch(err => 
            {
                res.status(400).send("não foi possível atualizar a comanda");
            });
        }
  });
});

// Delete
arquivadaRoutes.route('/delete/:id').get(function (req, res) 
{
    Arquivada.findByIdAndRemove({_id: req.params.id}, function(err, arquivada)
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

module.exports = arquivadaRoutes;