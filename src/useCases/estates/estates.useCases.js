// CRUD ESTATES

import { isValidObjectId } from "mongoose";
import { Estate } from "../../models/index.js";

// Creando una propiedad

async function createEstate (estateData) {
    const {name} = estateData

    // validar si esxiste la propiedad con este nombre 

    const existingEstate = await Estate.findOne({name})

    //lanzamos el error si la propiedad ya existe 
    if(existingEstate){
        throw new Error(`Ya existe una propiedad con el nombre ${name}`)
    }

    // crear una nueva propiedad

    const newEstate = await  Estate.create(estateData)
    return newEstate
}


// Obtner todas la propiedades 

async function getAllEstates () {
    const estates = await Estate.find({})
    return estates
}


// Obtner una propiedad por ID

async function getEstateByIdOrSlug (identifier){
    const isObjectId = isValidObjectId(identifier)

    let estate

    if(isObjectId){
        estate = await Estate.findById(identifier)
    }else{
        estate = await Estate.findOne({slug: identifier})
    }

    // Validar si la propiedad Existe 

    if(!estate){
        throw new Error(`No se encontro la propiedad con el identidficador: ${identifier}`)
    }

    return estate 
}


// Actualizar una propiedad
/* 

*@param {*} identifier Puede ser un ID de mongoDB o un slug
*@param {*} Objeto con los nuevos datos de la propiedad
*@returns {Promise<Estate>} Devuelve una promesa que resulve a un objeto Estate actualizado
*/

async function updateEstate (identifier, newData){
    //Validar si el identificador de Mongo  es un objectId
    const isObjectId = isValidObjectId(identifier)
    let updatedEstate
    if(isObjectId){
        updatedEstate = await Estate.findByIdAndUpdate(identifier, newData, {new: true}) // actualiza por Id

    }else{
        updatedEstate = await Estate.findOneAndUpdate({slug: identifier},newData,{new: true})
    }
    // Validar si la propiedad fue actualizada 
    if(!updatedEstate){
        throw new Error(`No se encontro la propiedad con el identidficador: ${identifier}`) 
    }
 return updatedEstate
}

//Eliminar Propiedad 
/* 
* @param {String} identifier Puede ser un id de mongoDB o un slug 
*  @param {Promise<void>} Devuelve una promesa que resulve cuando la propiedad ha sido elimindada
*/

async function deleteEstate(identifier){
    const isObjectId = isValidObjectId(identifier)
    let deleteEstate
    if(isObjectId){
        deleteEstate = await Estate.findByIdAndDelete(identifier)
    }else{
        deleteEstate = await Estate.findOneAndDelete({slug: identifier})
    }

    // validar si la propiedad fue eleiminda 

    if(!deleteEstate){
        throw new Error(`No se encontro la propiedad con el identidficador: ${identifier}`)
    }

    return deleteEstate
}

export {
    createEstate,
    getAllEstates,
    getEstateByIdOrSlug,
    updateEstate,
    deleteEstate,
}