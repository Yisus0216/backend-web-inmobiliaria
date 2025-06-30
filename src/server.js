/* Rutas y Endpoints */

import express from "express"; //  ayuda a construir un servidor web
import cors from 'cors'; // permite que personas de otros lugares puedan hacer pedidos a mi servidor
import http from 'http'
//importar las rutas de Estate 
import estateRoutes from './routes/estates/estates.routes.js'
import amenityRoutes from './routes/amenities/amenities.routes.js'
import handlerError from "./middleware/handlerError.js";
import categoryRoutes from "./routes/categories/categories.routes.js"
import multimediasRoutes from "./routes/multimedia/multimedia.routes.js"

const app = express();  // creando mi servidor con Express.
app.use(cors());  // Le digo a mi servidor: “acepta pedidos desde otros lugares, no solo de los que están en la misma dirección”.
app.use(express.json()); // Esto hace que el servidor pueda leer los datos que el cliente le manda (como nombre, correo, mensaje, etc.).

const httpServer = http.createServer(app); // Esto crea un servidor HTTP que usa tu aplicación Express.


//Definiendo las rutas principal al momento de acceder al dominio 
app.use('/estates', estateRoutes)
app.use('/amenities', amenityRoutes)
app.use('/categories', categoryRoutes )
app.use('/multimedias',multimediasRoutes)

app.get('/', (req, res) =>{
    res.json({
        api: 'API de ejemplo',
        version: '1.0.0',
        usergit: 'JesusAvi'
    })
} )

//middleware - handlerError

app.use(handlerError)


//Exportando el servidor 

export {
    httpServer 
}
