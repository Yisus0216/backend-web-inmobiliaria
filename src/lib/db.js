import mongoose from 'mongoose'
import {config} from '../../config.js'

async function connectDB (){
    try {
         const URL = config.dbUri
         await mongoose.connect(URL)
         console.log('Base de datos conectada satisfactoriamnete')
    }catch (error){
        console.error('Error al conectar con la base de datos', error)
        throw new Error('Conexion fallida con la base de datos')
    }
}

export default {
    connectDB
}