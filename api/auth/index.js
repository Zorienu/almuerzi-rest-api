// middleware que vamos a usar para proteger los otros endpoints, los de meals y orders, verificar si el usuario se encuentra autenticado
const jwt = require('jsonwebtoken');
const Users = require('../models/Users');

// un middleware es una función en node que va a recibir request y response pero también recibe next y cuando llamemos a la función de next va a ejecutar el siguiente middleware
const isAuthenticated = (req, res, next) => {
    const token = req.headers.authorization; // sacamos el token de la petición que nos va a hacer el usuario
    if (!token) return res.sendStatus(403); // si no existe el token responder con forbidden

    // verificar el token
    jwt.verify(token, 'mi-secreto', (err, decoded) => {
        const { _id } = decoded; // extraer el id que contiene
        Users.findOne({ _id }).exec()
            .then(user => {
                req.user = user // modificamos el objeto de request para que quede disponible para el middleware siguiente
                next()
            })
    }) // recibe el token y la llave secreta, y un callback con el token decodificado

}

// tras terminar esto, agregamos la función a las rutas que queramos proteger, por ejemplo en orders, POST
// preguntar si el usuario tiene determinado role
const hasRole = role => (req, res, next) => {
    if (req.user.role === role) {
        return next()
    }
    res.sendStatus(403);
}

module.exports = {
    isAuthenticated,
    hasRole,
}