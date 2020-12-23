const express = require('express');
const Meals = require('../models/Meals') // importamos el modelo de meals

const router = express.Router() // una instancia de un router de nuestra app

// le pasamos la url que nos interesa que este maneje, en este caso la raiz
router.get('/', (req, res) => {
    // aquí va la lógica que queremos que se ejecute cuando lleguemos a esta ruta de la raiz
    // cuando llamemos a la URL en nuestro explorador WEB se ejecutará esta lógica solamente cuando llamemos a '/api/meals'
    // buscar todos los elementos que se encuentren dentro de la colección de Meals
    Meals.find()
        .exec()
        .then(x => res.status(200).send(x)); // indicar que queremos devolver al user, en este caso según la convención de rest, nosotros tenemos que devolver necesariamente el código 200 y enviar la data
  
        //res.send('hola meals');
})

// obtener solamente uno, recibiremos un parámetro de nombre id
// esto quiere decir que cuando ingresemos a la ruta de meals, coloquemos un slash '/' y además le entreguemos otro valor, por ejemplo 'lala', nosotros vamos a poder obtener este valor de 'lala' de la URL
router.get('/:id', (req, res) => {
    // req.params es un objeto con todos parámetros que tenemos en la URL
    Meals.findById(req.params.id)
        .exec()
        .then(x => res.status(200).send(x))
})

// y cuando llamemos la ruta de '/api/meals' pero con el verbo de 'post' va a ejecutar esto
router.post('/', (req, res) => {
    // con este metodo podremos crear elementos basado en lo que recibamos por el 'body' de nuestra petición
    // en este caso el body es todo lo que mandemos a través de las peticiones de post
    Meals.create(req.body).then(x => res.status(201).send(x))
    //res.send('post meals');
})

// para actualizar un elemento
// el id es para identificar el elemento que queremos actualizar
router.put('/:id', (req, res) => {
    Meals.findOneAndUpdate(req.params.id, req.body)
        .then(() => res.sendStatus(204))
        // podemos decidir si le devolvemos algo al usuario o no, en este caso como nosotros ya vamos a tener estos datos por el lado del cliente, no es necesario que se los devolvamos
})

router.delete('/:id', (req, res) => {
    Meals.findByIdAndDelete(req.params.id).exec().then(() => res.sendStatus(204))
})

module.exports = router