/*module.exports = (request, response) => {
    // request: objeto encargado de contener toda la petición que está realizando el cliente, en este caso el navegador
    // response: objeto encargado de contener todos losdmétodos pertinentes para que podamos devolver datos al usuario que está realizando la petición
    response.send('Hello world');
}*/

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const meals = require('./routes/meals');
const orders = require('./routes/orders');

const app = express(); // devuelve un objeto con distintos métodos para crear nuestra app

// use nos permite agregar plugins a nuestro server de express para poder ir agregando funcionalidades al server
// bodyParser.json() devuelve un plugin para usarlo con app.use()
app.use(bodyParser.json())
// cors() devuelve otro plugin para usarlo en express
// todos los plugin tienen formas distintas de utilizarse por lo que no se encuentra una forma estructurada de como se debe usar para conectarlos con express, por lo que debemos ir a la documentación de cada una de estas librerías y ver como debemos configurarlos con nuestro servidor de express
app.use(cors())
// si no habilitamos los cors, cuando estemos haciendo debugging en local no va a funcionar

// crear conexión con el servidor de base de datos
// process.env nos permite acceder a las variables de entorno, en este caso MONGO_URI
// entre llaves el objeto de configuración necesarias para interpretar la URL
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true})

// que queremos setear dentro de nuestra app, en este caso cuando llamamos a cualquier ruta '*'
/* esto lo remplazamos por app.use('/api/...', ...)
app.get('*', (req, res) => {
    res.send('esto es una respuesta');
}) */

app.use('/api/meals', meals);
app.use('/api/orders', orders);
app.get('*', (req, res) => {
    res.send('jia');
})
module.exports = app
// luego podemos desplegar nuestra aplicación a vercel con el comando 'vercel'
// dentro de inspect vamos a agregar la variable de entorno MONGO_URI con el valor del link de mongodb
// mongodb+srv://zorienu:java1094@cluster0.w3vb3.mongodb.net/almuerzi-db?retryWrites=true&w=majority