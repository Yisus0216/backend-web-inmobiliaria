import express from 'express'
import { createAmenity, deleteAmenity, getAllAmenities, getAmenityByIdOrSlug, updateAmenity } from '../../useCases/amenities/amenities.useCases.js'


const router = express.Router()


// POST Para amenidades 
router.post('/', async(request,response,next) =>{
    try{
        //si la promesa no se resuelve manda una exepcion
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

//Obtener todas las amenidades 

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

//Obtenr por id o Slug

router.get('/:identifier', async(request,response,next)=>{
    try {
        //Destructurando el objeto por identificador y asignando a params
        const {identifier} = request.params
        const amenity = await getAmenityByIdOrSlug(identifier)
        response.status(201).json({
            success:true,
            message: 'Amenidad Encontrada con Exito',
            data: amenity
        })
    } catch (error) {
       next(error) 
    }
})


// Atualizando una amenidad

router.patch('/:identifier', async(request,response,next)=>{
    try {
        const {identifier} = request.params
        const body = request.body
         const amenity = await updateAmenity(identifier,body)
        response.status(200).json({
            success:true,
            message: 'Amenidad actualizada con exito',
            data: amenity
        })
    } catch (error) {
        next(error)
    }
    

})  

//Eliminar amenidad

router.delete('/:identifier', async(request,response,next)=>{
    const {identifier} = request.params
    const amenity = await deleteAmenity(identifier)
    response.status(201).json({
        success:true,
        message:'Propiedad eliminada correctamente',
        data: amenity
    })
})

export default router