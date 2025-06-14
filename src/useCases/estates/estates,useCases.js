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

    const newEsate = await  Estate.create(estateData)
    return newEsate
}


// Obtner todas la propiedades 

async function getAllState () {
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

export {
    createEstate,
    getAllState,
    getEstateByIdOrSlug
}