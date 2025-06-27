import express, { response } from 'express'
import { createCategory, deleteCategory, getAllCategories, getCategoryById, updateCategory } from '../../useCases/categories/categories.useCases.js'
import { Category } from '../../models/index.js'



const router = express.Router()

//POST

router.post('/', async(request,response,next)=>{
    try {
        const body = request.body
        const category = await createCategory(body)
        response.status(201).json({
            succsess:true,
            message: 'Categoria creada con exito',
            data:category
        })
    } catch (error) {
        next(error)
    }
})

//Obtener Categorias
router.get('/', async(request,response,next)=>{
    try {
        const categories = await getAllCategories()
        response.status(201).json({
            success: true,
            message: 'Categorias Encontradas',
            data: categories
        })
    } catch (error) {
        next(error)
    }
})

//Obtener Categoria por Id

router.get('/:id', async(request,response,next)=>{
    try {
        const {id} = request.params
        const category = await getCategoryById(id)
        response.status(201).json({
            success:true,
            message:'Categoria encontrada con exito',
            data:category
        })
    } catch (error) {
        next(error)
    }
})

//Actualizar Categoria

router.patch('/:identifier', async(request,response,next)=>{
   try {
        const {identifier} = request.params
        const body = request.body
        const category = await updateCategory(identifier,body)
        response.status(201).json({
            success:true,
            message:'Categoria Actualizada con Exito',
            data:category
        })
   } catch (error) {
        next(error)
   }
})

// Eliminar Categoria

router.delete('/:identifier', async(request,response,next)=>{
    try {
        const {identifier} = request.params
        const category = await deleteCategory(identifier)
        response.status(201).json({
            success:true,
            message:'Categoria eliminada con exito',
            data:category
        })

    } catch (error) {
        next(error)
    }
})

export default router