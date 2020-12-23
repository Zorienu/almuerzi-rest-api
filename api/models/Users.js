const mongoose = require('mongoose')
// mongoose tiene una propiedad que es la de schema con la que podremos definir o crear nuestros modelos en el código
const Schema = mongoose.Schema

// ahora podremos crear nuestros modelos
// el primer argumento es el nombre del model (en singular)
// luego definimos un schema
// pasaremos un objeto literal al constructor de Schema donde le asignamos las propiedades
// name: le indicamos que todos los objetos que creemos dentro de la colección de 'Meal' van a tener una propiedad la cual se va a llamar 'name' de tipo 'String'
const Users = mongoose.model('User', new Schema({
    email: String,
    password: String,
    salt: String, // string que vamos a utilizar para poder encriptar también nuestra constraseña
}))

// exportar el modulo creado previamente
module.exports = Users
// con esto ya hemos creado nuestro primer modelo