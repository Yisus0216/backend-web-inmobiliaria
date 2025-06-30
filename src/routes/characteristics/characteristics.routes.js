import express from 'express'
import { createCharacteristic, deleteCharacteristic, getAllCharacteristics, getCharacteristicByIdOrSlug, updateCharacteristic } from '../../useCases/characteristics/characteristics.useCases.js'

const router = express.Router()


router.post('/', async(request,response,next) =>{
    try {
        const body = request.body
        const characteristic = await createCharacteristic(body)
        response.status(201).json({
            success:true,
            message: 'Caracteristica creada correctamente',
            data: characteristic
        })
    } catch (error) {
        next(error)
    }
})


// Obtener todas las Caracteristicas

router.get('/', async(request,response,next)=>{
    try {
        const characteristics = await getAllCharacteristics({})
        response.status(200).json({
            success:true,
            message: 'Caracteristicas Encontradas con exito',
            data:characteristics
        })
    } catch (error) {
        next(error)
    }
})

// Obtener caracteristica por id o Slug 

router.get('/:identifier', async(request,response,next)=>{
    try {
       const {identifier} = request.params
       const characteristic = await getCharacteristicByIdOrSlug(identifier)
       response.status(200).json({
        success:true,
        message:'Caracteristica encontrada con exito',
        data:characteristic

       })
    } catch (error) {
        next(error)
    }

})


// Actualizar una caracteristica 

router.patch('/:identifier', async(request,response,next)=>{
    try {
        const {identifier} = request.params
        const body = request.body
        const characteristic = await updateCharacteristic(body,identifier)
        response.status(202).json({
            success:true,
            message: 'Caracteristica actualizada con exito',
            data: characteristic
        })
    } catch (error) {
        next(error)
    }
})

//Eliminar UNA caracteristica

router.delete('/:identifier', async(request,response,next)=>{
      try {
        const {identifier} = request.params
        const characteristic = await deleteCharacteristic(identifier)
        response.status(200).json({
            success:true,
            message:'caracteristica eliminada con exito',
            data: characteristic
        })
      } catch (error) {
        next(error)
      }
})














export default router