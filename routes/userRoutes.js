const express = require('express');
var app = express();

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth');

const userRoutes = express.Router();

const User = require('../models/User');

// Função auxiliar para criação de token
function generateToken(params = {}) { 
    return jwt.sign(params, authConfig.secret, { 
        expiresIn: 86400
    });
}

// Create
userRoutes.route('/register').post(async function(req, res) 
{
    const { email } = req.body;

    try {
        if (await User.findOne({ email })) {
            return res.status(400).send({ error: 'Usuário já existe' });
        }

        const user = await User.create(req.body);

        user.password = undefined;

        return res.send( { 
            user, 
            token: generateToken({ id: user.id })
        });
    } catch(err) {
        return res.status(400).send({ err });
    }
});

// Valida
userRoutes.post('/authenticate', async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne( { email }).select('+password');

    if(!user) { return res.status(400).send({ error: 'Usuário não encontrado' }); }

    if(!await bcrypt.compare(password, user.password)) { 
        return res.status(400).send({ error: 'Senha inválida ' }); 
    }

    user.password = undefined;

    const token = jwt.sign({ id: user.id }, authConfig.secret, {
        expiresIn: 86400
    });  

    res.send({ 
        user, 
        token: generateToken({ id: user.id }) 
    });
});

module.exports = userRoutes;