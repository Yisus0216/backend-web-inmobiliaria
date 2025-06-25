import { isValidObjectId } from "mongoose";
import { Amenity } from "../../models/index.js";
import { StatusHttp } from "../../lib/statusHttp.js";


//CRUD

async function createAmenity(amenityData){
    const {name} = amenityData

    const existingAmenity = await Amenity.findOne({name})

    if(existingAmenity){
        throw new Error(`Ya existe una amenidad con el nombre ${name}`)
    }

    const newAmenity = await Amenity.create(amenityData)
    return newAmenity
}

//Obtener todas las amenidades 
async function getAllAmenities(){
    const amenities =await Amenity.find({})
    return amenities
}

//Obtner Por ID o Slug

async function getAmenityByIdOrSlug(identifier){
    //validar si es un tipo de datos objectId
    const isObjectId = isValidObjectId(identifier)

    let amenity
    // si Object Id igual a id de mongoose
    if(isObjectId){
        amenity = await Amenity.findById(identifier)
    }else{
        // caso contrario si object ID no es id de monmgoose viene un slug
        amenity = await Amenity.findOne({slug: identifier})
    }

    // validar si la propiedad Existe

    if(!amenity){
        throw new StatusHttp(`No se encontro la amenidad con el identificador ${identifier}`,404)
    }

    return amenity


}


// Actualizar una amenidad 

async function updateAmenity(identifier,newData){
   const isObjectId = isValidObjectId(identifier)

   let updatedAmenity

   // Validar si es por Id o Slug
   if(isObjectId){
    updatedAmenity = await Amenity.findByIdAndUpdate(identifier, newData, {new: true})
   }else{
    updatedAmenity = await Amenity.findOneAndUpdate({slug: identifier}, newData, {new:true})
   }

   //Validar si existe la Amenidad 

   if(!updatedAmenity){
    throw new StatusHttp(`No se encontro ninguna amenidad con el identificador ${identifier}`)
   }

   return updatedAmenity
}


//Eliminar una Amenidad 

async function deleteAmenity(identifier){
    const isObjectId = isValidObjectId(identifier)
    
    let deleteAmenity
    if(isObjectId){
        deleteAmenity = await Amenity.findByIdAndDelete(identifier)
    }else{
        deleteAmenity = await Amenity.findOneAndDelete({slug: identifier})
    }

    //verificar si esxite la amenidad

    if(!deleteAmenity){
        throw new StatusHttp(`No se encontro la amenidad con el identificador ${identifier}`)
    }

    return deleteAmenity

}


export {
    createAmenity,
    getAllAmenities,
    getAmenityByIdOrSlug,
    updateAmenity,
    deleteAmenity
}