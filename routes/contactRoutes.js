var express = require('express');
var app = express();
var contactRoutes = express.Router();

var Contact = require('../models/Contact');

// Create
contactRoutes.route('/add').post(function (req, res) 
{
    var contact = new Contact(req.body);
   
    contact.save()
    .then(item => 
    {
        res.status(200).json({'contact': 'Contato adicionado com sucesso!'});
    })
    .catch(err => 
    {
        res.status(400).send("Ocorreu um erro...");
    });
});

// Read
contactRoutes.route('/').get(function (req, res) 
{
    Contact.find(function (err, contacts)
    {
        if(err)
        {
            console.log(err);
        }
        else 
        {
            res.json(contacts);
        }
    });
});

// Edit
contactRoutes.route('/edit/:id').get(function (req, res) 
{
    var id = req.params.id;
    Contact.findById(id, function (err, contact)
    {
        res.json(contact);
    });
});

//  Update
contactRoutes.route('/update/:id').post(function (req, res) 
{
   Contact.findById(req.params.id, function(err, contact) 
   {
        if (!contact)
        {
            return next(new Error('Não foi possível ler'));
        }
        else 
        {
            contact.name = req.body.name;
            contact.email = req.body.email;
            contact.phone = req.body.phone;
            contact.dateBorn = req.body.dateBorn;

            contact.save().then(contact => 
            {
                res.json('Contato atualizado com sucesso!');
            })
            .catch(err => 
            {
                res.status(400).send("não foi possível atualizar o contato");
            });
        }
  });
});

// Delete
contactRoutes.route('/delete/:id').get(function (req, res) 
{
    Contact.findByIdAndRemove({_id: req.params.id}, function(err, contact)
    {
        if (err)
        {
            res.json(err);
        } 
        else 
        {
            res.json('Contato removido com sucesso!');
        }
    });
});

module.exports = contactRoutes;