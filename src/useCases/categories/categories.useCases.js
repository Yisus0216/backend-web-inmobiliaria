import { isValidObjectId } from "mongoose"
import { Category } from "../../models/index.js"
import { StatusHttp } from "../../lib/statusHttp.js"

// Crud Create

async function createCategory(categoryData){
    //Destructurando objeto de categoryData
    const {name} = categoryData

    //Se valida si la categoria existe

    const existingCategory = await Category.findOne({name})

    // Si existingCategory true
    if(existingCategory){
        throw new StatusHttp(`Ya existe una Categoria con el nombre ${name}`,400)
    }

    // si existingCategory = false

    const newCategory = await Category.create(categoryData)

    //retornamos newCategory

    return newCategory
}

// Obtener Categoria

async function getAllCategories(){
    const category = await Category.find({})
    return category
}

// Obtener categorias por id

async function getCategoryById(id){
    const category = await Category.findById(id)
    if (!category) {
    throw new StatusHttp(`No se encontró la categoría con el ID: ${id}`, 404)
  }
  return category 
}

// Actualizasr categoria por id o slug

async function updateCategory(identifier,newData){
    const isObjectId = isValidObjectId(identifier)
    
    let updatedCategory
    // vaslidar is es un tipo de dato valido (true) objectId
    if(isObjectId){
     updatedCategory = await Category.findByIdAndUpdate(identifier,newData,{new:true})
    }else{
        updatedCategory = await Category.findOneAndUpdate({slug: identifier}, newData,{new:true})
    }

    if(!updatedCategory){
        throw new StatusHttp(`No se encontró la categoría con el ID: ${id}`, 404)
    }

    return updatedCategory
}

// Eliminar una Categoria

async function deleteCategory(identifier){
    const isObjectId = isValidObjectId(identifier)

    let deleteCategory
    //Validar si es un objeto valido de mongoose true
    if(isObjectId){
        deleteCategory = await Category.findByIdAndDelete(identifier)
    }else{
        deleteCategory = await Category.findOne({slug:identifier})
    }

    //Validamos si existe 
    if(!deleteCategory){
        throw new StatusHttp(`No se encontró la categoría con el ID: ${id}`, 404)
    }
}

export{
    createCategory,
    getAllCategories,
    getCategoryById,
    updateCategory,
    deleteCategory
}