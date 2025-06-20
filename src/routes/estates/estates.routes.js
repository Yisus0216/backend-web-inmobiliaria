import express, { request } from 'express'
import { createEstate, getAllEstates, getEstateByIdOrSlug, deleteEstate, updateEstate } from '../../useCases/estates/estates.useCases.js'
const router = express.Router()



// POST estate 

// Enviar datos a la base de datos 
router.post('/', async (request, response, next) =>{
    try {
        const body = request.body
        const estate = await createEstate(body)
        response.status(201).json({
            success: true,
            message: 'Propiedad creada con exito',
            data: estate
        })
    }catch (error){
        next(error)
    }
})

// Obtener todas la propiuedad del documento 
router.get ('/', async (request, response, next) =>{
    try{
        const estates = await getAllEstates()
        response.status(201).json({
            success: true,
            message: 'Propiedad encontrada satisfactoriamnete',
            data: estates
        })
    }catch (error){
        next(error)
    }
})


// Obtener propiedades por ID o Slug

router.get('/:identifier', async(request,response,next) =>{
    try{
        const { identifier } = request.params
        const estate = await getEstateByIdOrSlug(identifier)
        response.status(201).json({
            success: true,
            message: 'Propiedad Encontrada correctamente',
            data:estate
        })
    }catch (error){
        next(error)
    }
})

// Actualizar una propiedad que se busca por Id o Slug

router.patch('/:identifier', async(request,response,next)=>{
    try{
        const {identifier} = request.params
        const body = request.body
        const estate = await updateEstate(identifier,body)
        response.status(202).json({
            success:true,
            message: 'Propiedad Encontrada y actualizada',
            data: estate
        })
    }catch(error){
        next(error)
    }
})


// Eliminar una Propiedad 

router.delete('/:identifier', async (request,response,next) =>{
    try {
        const {identifier} = request.params
        const estate = await deleteEstate(identifier)
        response.status(200).json({
            success:true,
            message: 'Propiedad Eliminada Correctamnte',
            data: estate
        })
    } catch (error) {
        next(error)
    }
})


export default router