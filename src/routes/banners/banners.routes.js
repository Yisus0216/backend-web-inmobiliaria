import express from 'express'
import { createBanner, deleteBanner, getAllBanners, getBannerById, updateBanner } from "../../useCases/banners/banners.useCases.js";
const router = express.Router()

// Crear un Banner

router.post('/',async(request,response,next)=>{
    try {
        const body = request.body
        const banner = await createBanner(body)
        response.status(201).json({
            success:true,
            message: 'Banner creado con exito',
            data: banner
        })
    } catch (error) {
        next(error)
    }
})


// Obtener banners

router.get('/', async(request,response,next)=>{
    try {
        const banner = await getAllBanners()
        response.status(200).json({
            success:true,
            message:'Baners Obtenidos con exito',
            data:banner
        })
    } catch (error) {
        next(error)
    }
})

// Obtener Banner por Id 

router.get('/:id', async(request,response,next)=>{
    try {
        const {id} = request.params
        const banner = await getBannerById(id)
        response.status(200).json({
            success:true,
            message: 'Banner encontrado con exito',
            data: banner
        })
    } catch (error) {
        next(error)
    }
})

// Actualizar Banners 

router.patch('/:id', async(request,response,next)=>{
       try {
             const {id} = request.params
        const body = request.body
        const banner = await updateBanner(id,body)
        response.status(200).json({
            success:true,
            message:'Banner actualizado con exito',
            data: banner
        })
       } catch (error) {
         next(error)
       }
})


// Eliminar un Banner

router.delete('/:id',async(request,response,next)=>{
    try {
        const {id} = request.params
        const banner = await deleteBanner(id)
        response.status(200).json({
            success:true,
            message:'Banner eliminado con exito',
            data:banner
        })
    } catch (error) {
        next(error)
    }
})















export default router