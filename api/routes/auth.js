const express = require('express');
const crypto = require('crypto'); // para encriptar la contraseña y crear el salt
const jwt = require('jsonwebtoken'); // para encriptar y desencriptar nuestra llave
const Users = require('../models/Users') // importamos el modelo de meals
const { isAuthenticated } = require('../auth')

const router = express.Router() // una instancia de un router de nuestra app

const signToken = (_id) => {
    return jwt.sign({ _id }, 'mi-secreto', {
        expiresIn: 60 * 60 * 24 * 365,
    }) // recibe un secreto (un string sumamente complicado), expiresIn está en segundos
}
// para autenticación solo necesitamos dos POST
router.post('/register', (req, res) => {
    const { email, password } = req.body;
    crypto.randomBytes(16, (err, salt) => {
        const newSalt = salt.toString('base64'); // string muy largo
        crypto.pbkdf2(password, newSalt, 10000, 64, 'sha1', (err, key) => {
            // key: buffer de la contraseña encriptada, transformar a String
            const encryptedPassword = key.toString('base64')
            Users.findOne({ email }).exec() // verificar si el usuario existe y si no crearlo
                .then(user => {
                    if (user) {
                        return res.send('usuario ya existe'); // en caso de que encuentra un email igual
                    }
                    // crear el usuario en la DBS
                    Users.create({
                        email,
                        password: encryptedPassword,
                        salt: newSalt,
                    }).then(() => {
                        res.send('usuario creado con éxito')
                    })
                })
        })
    })
})

router.post('/login', (req, res) => {
    const { email, password } = req.body;
    Users.findOne({ email }).exec()
        .then(user => {
            if (!user) {
                return res.send('usuario y/o contraseña incorrectos...')
            }
            crypto.pbkdf2(password, user.salt, 10000, 64, 'sha1', (err, key) => {
                const encryptedPassword = key.toString('base64');
                if (encryptedPassword === user.password) {
                    // generar la llave que le vamos a devolver al usuario
                    const token = signToken(user._id) // toma el user._id y lo encripta para devolverlo al usuario para cuando el quiere comunicarse con nuestro servidor, el va a tener que llamar a nuestras rutas pero con este token dentro de la cabecera
                    // en las peticiones que se hagan a nuestra api vamos a desencriptar esta llave, vamos a buscar este usuario por el id y lo vamos a asignar a nuestro objeto de request de manera de que este siempre se encuentre disponible en todas las peticiones que nosotros hagamos a nuestra API
                    return res.send({ token })
                }
                return res.send('usuario y/o contraseña incorrectos...')
            })
        })
})

router.get('/me', isAuthenticated, (req, res) => {
    res.send(req.user)
})

module.exports = router