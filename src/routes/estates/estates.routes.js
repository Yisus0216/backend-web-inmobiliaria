import express from 'express'
import { createEstate, getAllEstates } from '../../useCases/estates/estates.useCases.js'
const router = express.Router()



// POST estate 

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

router.get ('/', async (request, response, next) =>{
    try{
        const estates = await getAllEstates()
        response.status(200).json({
            success: true,
            message: 'Propiedad encontrada satisfactoriamnete',
            data: estates
        })
    }catch (error){
        next(error)
    }
})


export default router