
import { httpServer } from './src/server.js'
import { config } from './config.js'
import db from './src/lib/db.js'

const PORT = config.port


// Iniciar el servidor y la base de datos 

async function startServer (){
  try{
    await db.connectDB()
    httpServer.listen(PORT, () => {
      console.log(`El servidor esta corriendo en el puerto ${PORT}`)
    })
  } catch (error){
    console.error('Error al inciar el Servidor', error)
  }
}


startServer()