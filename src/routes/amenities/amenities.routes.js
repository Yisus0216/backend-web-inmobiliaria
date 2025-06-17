import express from 'express'
import { createAmenity, getAllAmenities } from '../../useCases/amenities/amenities.useCases.js'


const router = express.Router()


// POST Para amenidades 
router.post('/', async(request,response,next) =>{
    try{
        const body = request.body
        const amenity = await createAmenity(body)
        response.status(201).json({
            success: true,
            message: 'Amenidad creada con exito',
            data:amenity
        })
    }catch (error){
        next(error)
    }
})


router.get('/', async(request, response, next) =>{
    try{
        const amenity = await getAllAmenities()
        response.status(201).json({
             
        success: true,
        message: 'Propiedades Encontradas',
        data : amenity
    })
       

    }catch (error){
        next(error)
    }
   
})

export default router