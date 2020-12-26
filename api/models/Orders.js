const mongoose = require('mongoose')
const Schema = mongoose.Schema

// meal: le indicaremos cual va a ser el plato de comida o 'meal' que queremos asignar a la orden ya que una orden se va a componer de un usuario y también del plato de comida que quiere.
// nosotros no podemos guardar el plato de comida completo acá pero si podemos guardar una referencia a ese plato de comida por lo que nosotros en lugar de indicar el nombre del plato de comida o cualquier otra cosa referente a eso vamos a indicarle el id que tiene este plato de comida
// todos los documentos que nosotros estemos creando, van a tener un identificador único el cual nosotros le llamaremos id, podremos acceder a él desde código con la propiedad de '_id' lo que nos entrega un identificador que es completamente único e irrepetible que nosostros vamos a utilizar para saber que plato de comida o que meal hace referencia esta orden
const Orders = mongoose.model('Order', new Schema({
    // le tenemos que pasar un objeto, primero el tipo, pasando el esquema, con la propiedad Types en la cual le podemos indicar que tipo de dato es el que nosotros vamos a guardar si es que no es String, boolean o número podemos acceder a esta propiedad para indicarle propiedades como por ejemplo que esta es un ObjectId, indicándole que lo que vamos a guardar acá va a ser el identificador o el id de otro documento, que en este caso la referencia 'ref' es la de un documento 'Meal'
    meal_id: {type: Schema.Types.ObjectId, ref: 'Meal'},
    user_id: String,
    user_email: String
}))

module.exports = Orders;