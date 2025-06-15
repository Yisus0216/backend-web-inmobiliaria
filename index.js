
import { httpServer } from './src/server.js'

const PORT = 4000

httpServer.listen(PORT, () => {
  console.log(`El servidor esta corriendo en el puerto ${PORT}`)
})