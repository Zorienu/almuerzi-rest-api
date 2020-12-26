const express = require('express');
const Orders = require('../models/Orders') // importamos el modelo de meals
const { isAuthenticated, hasRole } = require('../auth/index')

// isAuthenticated se encarga de agregar el usuario al objeto de request
// hasRole utiliza el objeto usuario dentro de request y va a preguntar si tiene un rol en particular

const router = express.Router() // una instancia de un router de nuestra app

// le pasamos la url que nos interesa que este maneje, en este caso la raiz
router.get('/', (req, res) => {
    // aquí va la lógica que queremos que se ejecute cuando lleguemos a esta ruta de la raiz
    // cuando llamemos a la URL en nuestro explorador WEB se ejecutará esta lógica solamente cuando llamemos a '/api/meals'
    // buscar todos los elementos que se encuentren dentro de la colección de Meals
    Orders.find()
        .exec()
        .then(x => res.status(200).send(x)); // indicar que queremos devolver al user, en este caso según la convención de rest, nosotros tenemos que devolver necesariamente el código 200 y enviar la data
  
        //res.send('hola meals');
})

// obtener solamente uno, recibiremos un parámetro de nombre id
// esto quiere decir que cuando ingresemos a la ruta de meals, coloquemos un slash '/' y además le entreguemos otro valor, por ejemplo 'lala', nosotros vamos a poder obtener este valor de 'lala' de la URL
router.get('/:id', (req, res) => {
    // req.params es un objeto con todos parámetros que tenemos en la URL
    Orders.findById(req.params.id)
        .exec()
        .then(x => res.status(200).send(x))
})

// y cuando llamemos la ruta de '/api/meals' pero con el verbo de 'post' va a ejecutar esto
router.post('/', isAuthenticated, (req, res) => {
    // con este metodo podremos crear elementos basado en lo que recibamos por el 'body' de nuestra petición
    // en este caso el body es todo lo que mandemos a través de las peticiones de post
    //Orders.create(req.body).then(x => res.status(201).send(x))
    
    // para crear nuestras órdenes de manera correcta, cuando estemos creando una orden, en lugar de estar recibiendo el usuario por la petición, nosotros se los asignemos por el lado del servidor, sacando el id de los usuarios que viene dentro de la request
    const { _id, email } = req.user
    Orders.create({ ...req.body, user_id: _id, user_email: email }).then(x => res.status(201).send(x)) // crear una copia de req.body y el user_id
    //res.send('post meals');
})

// para actualizar un elemento
// el id es para identificar el elemento que queremos actualizar
router.put('/:id', isAuthenticated, hasRole('user'), (req, res) => {
    Orders.findOneAndUpdate(req.params.id, { ...req.body, user_id: _id, user_email: email })
        .then(() => res.sendStatus(204))
        // podemos decidir si le devolvemos algo al usuario o no, en este caso como nosotros ya vamos a tener estos datos por el lado del cliente, no es necesario que se los devolvamos
})

router.delete('/:id', isAuthenticated, (req, res) => {
    Orders.findByIdAndDelete(req.params.id).exec().then(() => res.sendStatus(204))
})

module.exports = router