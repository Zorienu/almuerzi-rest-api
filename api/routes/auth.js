const express = require('express');
const Users = require('../models/Users') // importamos el modelo de meals

const router = express.Router() // una instancia de un router de nuestra app

// para autenticación solo necesitamos dos POST

router.post('/register', (req, res) => {
    res.send('soy registro')
})

router.post('/login', (req, res) => {
    res.send('soy login')
})

module.exports = router